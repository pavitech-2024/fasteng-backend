import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marshall, MarshallDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';

interface SampleData {
  asphaltContent: number;
  sumOfSaturatedMass: number;
  sumOfDryMass: number;
  sumOfSubmergedMass: number;
  stability: number;
  fluency: number;
  diametricalCompressionStrength: number;
  temperatureOfWater: number;
  maxSpecificGravity: number;
}

@Injectable()
export class VolumetricParameters_Marshall_Service {
  private logger = new Logger(VolumetricParameters_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private readonly marshallModel: Model<MarshallDocument>,
    private readonly marshallRepository: MarshallRepository,
  ) {}

  async setVolumetricParameters(body: any) {
    try {
      this.logger.log(
        'set volumetric parameters data on volumetric-parameters.marshall.service.ts > [body]',
        { body },
      );

      const { volumetricParametersData, trial: binderTrial, maxSpecificGravity, temperatureOfWater } = body;

      if (!maxSpecificGravity) {
        throw new Error('maxSpecificGravity is required');
      }

      const gravityResult = maxSpecificGravity.result || maxSpecificGravity.results;
      if (!gravityResult) {
        throw new Error('maxSpecificGravity must have either "result" or "results" property');
      }

      this.logger.log(
        `Gravity structure: ${JSON.stringify({
          hasResult: !!maxSpecificGravity.result,
          hasResults: !!maxSpecificGravity.results,
          keys: Object.keys(gravityResult),
        })}`,
      );

      let pointsOfCurveDosageVv = [];
      let pointsOfCurveDosageRBV = [];
      let volumetricParameters = [];

      const filteredData: any[] = [];

      Object.entries(volumetricParametersData).forEach(([key, value]: [string, any[]]) => {
        const allNonNull = value.every((obj) => Object.values(obj).every((val) => val !== null));
        if (allNonNull) {
          filteredData.push({ [key]: value });
        }
      });

      for (const item of filteredData) {
        let sumOfDryMass = 0;
        let sumOfSaturatedMass = 0;
        let sumOfSubmergedMass = 0;
        let sumStability = 0;
        let sumFluency = 0;
        let sumIndirectTensileStrength = 0;

        let nStability = 0;
        let nFluency = 0;
        let nIndirectTensileStrength = 0;

        const asphaltContentKey = Object.keys(item)[0];
        let usedMaxSpecificGravity: number;
        let asphaltContentResult: number;

        switch (asphaltContentKey) {
          case 'lessOne':
            usedMaxSpecificGravity = gravityResult.lessOne;
            asphaltContentResult = binderTrial - 1;
            break;
          case 'lessHalf':
            usedMaxSpecificGravity = gravityResult.lessHalf;
            asphaltContentResult = binderTrial - 0.5;
            break;
          case 'normal':
            usedMaxSpecificGravity = gravityResult.normal;
            asphaltContentResult = binderTrial;
            break;
          case 'plusHalf':
            usedMaxSpecificGravity = gravityResult.plusHalf;
            asphaltContentResult = binderTrial + 0.5;
            break;
          case 'plusOne':
            usedMaxSpecificGravity = gravityResult.plusOne;
            asphaltContentResult = binderTrial + 1;
            break;
          default:
            throw new Error('Invalid asphalt content');
        }

        for (const sample of item[asphaltContentKey]) {
          sumOfDryMass += sample.dryMass;
          sumOfSaturatedMass += sample.drySurfaceSaturatedMass;
          sumOfSubmergedMass += sample.submergedMass;

          if (sample.stability) {
            sumStability += sample.stability;
            nStability++;
          }

          if (sample.fluency) {
            sumFluency += sample.fluency;
            nFluency++;
          }

          if (sample.diametricalCompressionStrength) {
            sumIndirectTensileStrength += sample.diametricalCompressionStrength;
            nIndirectTensileStrength++;
          }
        }

        const sampleData: SampleData = {
          asphaltContent: asphaltContentResult,
          sumOfDryMass,
          sumOfSubmergedMass,
          sumOfSaturatedMass,
          stability: sumStability / (nStability || 1),
          fluency: sumFluency / (nFluency || 1),
          diametricalCompressionStrength:
            sumIndirectTensileStrength / (nIndirectTensileStrength || 1),
          temperatureOfWater,
          maxSpecificGravity: usedMaxSpecificGravity,
        };

        const result = await this.calculateVolumetricParameters(sampleData);

        pointsOfCurveDosageVv.push(...result.pointsOfCurveDosageVv);
        pointsOfCurveDosageRBV.push(...result.pointsOfCurveDosageRBV);
        volumetricParameters.push(...result.volumetricParameters);
      }

      return { volumetricParameters, pointsOfCurveDosageRBV, pointsOfCurveDosageVv };
    } catch (error) {
      throw new Error('Failed to set volumetric parameters.');
    }
  }

  async calculateVolumetricParameters(samplesData: SampleData) {
    try {
      const {
        asphaltContent,
        sumOfSaturatedMass,
        sumOfDryMass,
        sumOfSubmergedMass,
        stability,
        fluency,
        diametricalCompressionStrength,
        temperatureOfWater,
        maxSpecificGravity,
      } = samplesData;

      const samplesVolumes = sumOfSaturatedMass - sumOfSubmergedMass;
      const apparentBulkSpecificGravity = (sumOfDryMass / samplesVolumes) * temperatureOfWater;
      const volumeVoids = (maxSpecificGravity - apparentBulkSpecificGravity) / maxSpecificGravity;
      const voidsFilledAsphalt = (apparentBulkSpecificGravity * asphaltContent) / 102.7;
      const aggregateVolumeVoids = volumeVoids + voidsFilledAsphalt;
      const ratioBitumenVoid = voidsFilledAsphalt / aggregateVolumeVoids;

      return {
        volumetricParameters: [
          {
            asphaltContent,
            values: {
              volumeVoids,
              apparentBulkSpecificGravity,
              voidsFilledAsphalt,
              aggregateVolumeVoids,
              ratioBitumenVoid,
              fluency,
              stability,
              diametricalCompressionStrength,
              maxSpecificGravity,
            },
          },
        ],
        pointsOfCurveDosageVv: [{ x: asphaltContent, y: volumeVoids }],
        pointsOfCurveDosageRBV: [{ x: asphaltContent, y: ratioBitumenVoid }],
      };
    } catch (error) {
      throw new Error(`Failed to calculate volumetric parameters: ${error}`);
    }
  }

  async saveVolumetricParametersData(body: any, userId: string) {
    try {
      const { name } = body.volumetricParametersData;
      const marshallExists: any = await this.marshallRepository.findOne(name, userId);

      const { name: _, ...volumetricParametersWithoutName } = body.volumetricParametersData;

      await this.marshallModel.updateOne(
        { _id: marshallExists._doc._id },
        {
          ...marshallExists._doc,
          volumetricParametersData: volumetricParametersWithoutName,
        },
      );

      if (marshallExists._doc.generalData.step < 6) {
        await this.marshallRepository.saveStep(marshallExists, 6);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
