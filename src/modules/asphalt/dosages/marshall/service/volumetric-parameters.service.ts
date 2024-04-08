import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marshall, MarshallDocument } from '../schemas';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
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
      this.logger.log('set volumetric parameters data on volumetric-parameters.marshall.service.ts > [body]', {
        body,
      });

      const { volumetricParametersData } = body;
      const {
        percentsOfDosage: trialAsphaltContent,
        trial: binderTrial,
        maxSpecificGravity,
        temperatureOfWater,
      } = body;

      let pointsOfCurveDosageVv = [];
      let pointsOfCurveDosageRBV = [];
      let volumetricParameters = [];
      let asphaltContent;

      let newArray: any[] = [];

      Object.entries(volumetricParametersData).forEach(([key, value]: [string, any[]]) => {
        const allNonNull = value.every((obj: any) => Object.values(obj).every((val: any) => val !== null));
        if (allNonNull) {
          const newObj: any = {};
          newObj[key] = value;
          newArray.push(newObj);
        }
      });

      console.log('🚀 ~ VolumetricParameters_Marshall_Service ~ setVolumetricParameters ~ newArray:', newArray);

      for (let i = 0; i < newArray.length; i++) {
        let sumOfDryMass = 0;
        let sumOfSaturatedMass = 0;
        let sumOfSubmergedMass = 0;
        let sumStability = 0;
        let sumFluency = 0;
        let sumIndirectTensileStrength = 0;
        let nStability = 0;
        let nFluency = 0;
        let nIndirectTensileStrength = 0;
        let nDryMass = 0;
        let nSubmergedMass = 0;
        let nSaturatedMass = 0;

        let usedMaxSpecifyGravity;
        let asphaltContentResult;

        asphaltContent = Object.keys(newArray[i])[0];

        switch (asphaltContent) {
          case 'lessOne':
            usedMaxSpecifyGravity = maxSpecificGravity.result.lessOne;
            asphaltContentResult = binderTrial - 1;
            break;
          case 'lessHalf':
            usedMaxSpecifyGravity = maxSpecificGravity.result.lessHalf;
            asphaltContentResult = binderTrial - 0.5;
            break;
          case 'normal':
            usedMaxSpecifyGravity = maxSpecificGravity.result.normal;
            asphaltContentResult = binderTrial;
            break;
          case 'plusHalf':
            usedMaxSpecifyGravity = maxSpecificGravity.result.plusHalf;
            asphaltContentResult = binderTrial + 0.5;

            break;
          case 'plusOne':
            usedMaxSpecifyGravity = maxSpecificGravity.result.plusOne;
            asphaltContentResult = binderTrial + 1;
            break;
          default:
          // O que fazer se asphaltContent não corresponder a nenhum caso
        }

        for (let j = 0; j < newArray[i][asphaltContent].length; j++) {
          const {
            dryMass,
            drySurfaceSaturatedMass,
            submergedMass,
            stability,
            fluency,
            diametricalCompressionStrength,
          } = newArray[i][asphaltContent][j];

          sumOfDryMass += dryMass;
          sumOfSaturatedMass += drySurfaceSaturatedMass;
          sumOfSubmergedMass += submergedMass;
          nDryMass++;
          nSubmergedMass++;
          nSaturatedMass++;

          if (stability !== 0) {
            sumStability += stability;
            nStability++;
          }

          if (fluency !== 0) {
            sumFluency += fluency;
            nFluency++;
          }

          if (diametricalCompressionStrength !== 0) {
            sumIndirectTensileStrength += diametricalCompressionStrength;
            nIndirectTensileStrength++;
          }
        }

        if (nStability === 0) nStability = 1;
        if (nFluency === 0) nFluency = 1;
        if (nIndirectTensileStrength === 0) nIndirectTensileStrength = 1;

        const stabilityBar = sumStability / nStability;
        const fluencyBar = sumFluency / nFluency;
        const diametricalCompressionStrengthBar = sumIndirectTensileStrength / nIndirectTensileStrength;

        const sampleData =
          {
            asphaltContent: asphaltContentResult,
            sumOfDryMass,
            sumOfSubmergedMass,
            sumOfSaturatedMass,
            stability: stabilityBar,
            fluency: fluencyBar,
            diametricalCompressionStrength: diametricalCompressionStrengthBar,
            temperatureOfWater,
            maxSpecificGravity: usedMaxSpecifyGravity,
          };

        const {
          pointsOfCurveDosageVv: returnVv,
          pointsOfCurveDosageRBV: returnRBV,
          volumetricParameters: returnVp,
        } = await this.calculateVolumetricParameters(sampleData);

        pointsOfCurveDosageVv.push(...returnVv);
        pointsOfCurveDosageRBV.push(...returnRBV);
        volumetricParameters.push(...returnVp);
      }

      return { volumetricParameters, pointsOfCurveDosageRBV, pointsOfCurveDosageVv };
    } catch (error) {
      throw new Error('Failed to set volumetric parameters.');
    }
  }

  async calculateVolumetricParameters(samplesData: SampleData) {
    try {
      let pointsOfCurveDosageVv = [];
      let pointsOfCurveDosageRBV = [];
      let volumetricParameters = [];

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

      const samplesVolumes = (sumOfSaturatedMass - sumOfSubmergedMass);
      const apparentBulkSpecificGravity = (sumOfDryMass / samplesVolumes) * temperatureOfWater;
      const volumeVoids = (maxSpecificGravity - apparentBulkSpecificGravity) / maxSpecificGravity;
      const voidsFilledAsphalt = apparentBulkSpecificGravity * asphaltContent / 102.7;
      const aggregateVolumeVoids = volumeVoids + voidsFilledAsphalt;
      const ratioBitumenVoid = voidsFilledAsphalt / aggregateVolumeVoids;


      volumetricParameters.push({
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
      });

      pointsOfCurveDosageVv.push({ x: asphaltContent, y: volumeVoids });
      pointsOfCurveDosageRBV.push({ x: asphaltContent, y: ratioBitumenVoid });

      return {
        pointsOfCurveDosageVv,
        pointsOfCurveDosageRBV,
        volumetricParameters,
      };
    } catch (error) {
      throw new Error(`Failed to set volumetric parameters: ${error}`);
    }
  }

  async confirmVolumetricParameters(body: any) {
    try {
      const {
        valuesOfVolumetricParameters,
        confirmedSpecificGravity,
        optimumContent,
        confirmedPercentsOfDosage,
        listOfSpecificGravities,
        temperatureOfWater,
      } = body;

      let sumDryMass = 0;
      let sumSubmergedMass = 0;
      let sumSaturatedMass = 0;
      let sumStability = 0;
      let sumFluency = 0;
      let sumIndirectTensileStrength = 0;
      let nStability = 0;
      let nFluency = 0;
      let nIndirectTensileStrength = 0;
      let nDryMass = 0;
      let nSubmergedMass = 0;
      let nSaturatedMass = 0;

      for (let i = 0; i < valuesOfVolumetricParameters.length; i++) {
        sumDryMass += valuesOfVolumetricParameters[i].dryMass;
        sumSubmergedMass += valuesOfVolumetricParameters[i].submergedMass;
        sumSaturatedMass += valuesOfVolumetricParameters[i].drySurfaceSaturatedMass;
        nDryMass++;
        nSubmergedMass++;
        nSaturatedMass++;
        if (valuesOfVolumetricParameters[i].stability !== 0) {
          sumStability += valuesOfVolumetricParameters[i].stability;
          nStability++;
        }
        if (valuesOfVolumetricParameters[i].fluency !== 0) {
          sumFluency += valuesOfVolumetricParameters[i].fluency;
          nFluency++;
        }
        if (valuesOfVolumetricParameters[i].indirectTensileStrength !== 0) {
          sumIndirectTensileStrength += valuesOfVolumetricParameters[i].diametricalCompressionStrength;
          nIndirectTensileStrength++;
        }
      }

      let dryMass = sumDryMass / nDryMass;
      let saturatedMass = sumSaturatedMass / nSaturatedMass;
      let submergedMass = sumSubmergedMass / nSubmergedMass;
      if (nStability === 0) nStability = 1;
      if (nFluency === 0) nFluency = 1;
      if (nIndirectTensileStrength === 0) nIndirectTensileStrength = 1;

      const stabilityBar = sumStability / nStability;
      const fluencyBar = sumFluency / nFluency;
      const indirectTensileStrengthBar = sumIndirectTensileStrength / nIndirectTensileStrength;
      const samplesVolumes = saturatedMass - submergedMass;
      const apparentBulkSpecificGravity = (dryMass / samplesVolumes) * temperatureOfWater;
      const volumeVoids = (confirmedSpecificGravity - apparentBulkSpecificGravity) / confirmedSpecificGravity;
      const voidsFilledAsphalt = (apparentBulkSpecificGravity * optimumContent) / 102.7;
      const aggregateVolumeVoids = volumeVoids + voidsFilledAsphalt;
      const ratioBitumenVoid = voidsFilledAsphalt / aggregateVolumeVoids;
      const quantitative = confirmedPercentsOfDosage.map(
        (percent, i) => (confirmedSpecificGravity * percent * 10) / 1000 / listOfSpecificGravities[i],
      );
      quantitative.unshift(optimumContent * 10 * confirmedSpecificGravity);

      const confirmedVolumetricParameters = {
        valuesOfVolumetricParameters,
        asphaltContent: optimumContent,
        quantitative,
        values: {
          volumeVoids,
          apparentBulkSpecificGravity,
          voidsFilledAsphalt,
          aggregateVolumeVoids,
          ratioBitumenVoid,
          stability: stabilityBar,
          fluency: fluencyBar,
          indirectTensileStrength: indirectTensileStrengthBar,
        },
      };

      return confirmedVolumetricParameters;
    } catch (error) {
      throw new Error(`Failed to confirm volumetric parameters: ${error}`);
    }
  }

  temperaturesOfWater(name: string): number | undefined {
    const list = {
      '15°C - 0.9991': 0.9991,
      '16°C - 0.9989': 0.9989,
      '17°C - 0.9988': 0.9988,
      '18°C - 0.9986': 0.9986,
      '19°C - 0.9984': 0.9984,
      '20°C - 0.9982': 0.9982,
      '21°C - 0.9980': 0.998,
      '22°C - 0.9978': 0.9978,
      '23°C - 0.9975': 0.9975,
      '24°C - 0.9973': 0.9973,
      '25°C - 0.9970': 0.997,
      '26°C - 0.9968': 0.9968,
      '27°C - 0.9965': 0.9965,
      '28°C - 0.9962': 0.9962,
      '29°C - 0.9959': 0.9959,
      '30°C - 0.9956': 0.9956,
    };

    return list[name];
  }

  async saveStep6Data(body: any, userId: string) {
    try {
      this.logger.log(
        'save marshall volumetric parameters step on volumetric-parameters.marshall.service.ts > [body]',
        {
          body,
        },
      );

      const { name } = body.volumetricParametersData;

      const marshallExists: any = await this.marshallRepository.findOne(name, userId);

      const { name: materialName, ...volumetricParametersWithoutName } = body.volumetricParametersData;

      const marshallWithVolumetricParameters = {
        ...marshallExists._doc,
        volumetricParametersData: volumetricParametersWithoutName,
      };

      await this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithVolumetricParameters);

      if (marshallExists._doc.generalData.step < 6) {
        await this.marshallRepository.saveStep(marshallExists, 6);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
