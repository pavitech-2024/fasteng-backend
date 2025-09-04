import { SampleData } from './../interfaces/sample-data.interface';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marshall, MarshallDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { handleError } from 'utils/error-handler';
import {
  SaveVolumetricParametersRequestDTO,
  SaveVolumetricParametersResponseDTO,
} from '../dto/volumetric-params-data.dto';
import { WATER_TEMPERATURE_DENSITY } from '../../../../../utils/services/temperature.constants';
import { VolumetricCalculationsUtil } from '../../../../../utils/services/volumetric-calculations.util';
import { DataProcessingUtil } from '../../../../../utils/services/data-processing.util';
import { AsphaltContentUtil } from '../../../../../utils/services/asphalt-content.util';

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
      this.logger.log('set volumetric parameters data', { body });

      const { volumetricParametersData, trial: binderTrial, maxSpecificGravity, temperatureOfWater } = body;

      let pointsOfCurveDosageVv = [];
      let pointsOfCurveDosageRBV = [];
      let volumetricParameters = [];

      // Filtra dados não nulos
      const filteredData = DataProcessingUtil.filterNonNullVolumetricData(volumetricParametersData);

      for (const dataItem of filteredData) {
        const asphaltContentKey = Object.keys(dataItem)[0];
        const samples = dataItem[asphaltContentKey];

        // Calcula médias
        const averages = DataProcessingUtil.calculateAverages(samples, [
          'dryMass',
          'drySurfaceSaturatedMass',
          'submergedMass',
          'stability',
          'fluency',
          'diametricalCompressionStrength',
        ]);

        // Obtém valores do teor de asfalto
        const { asphaltContent } = AsphaltContentUtil.getAsphaltContentValues(asphaltContentKey, binderTrial);
        const usedMaxSpecifyGravity = AsphaltContentUtil.getMaxSpecificGravity(maxSpecificGravity, asphaltContentKey);

        const sampleData: SampleData = {
          asphaltContent,
          sumOfDryMass: averages.dryMass * samples.length,
          sumOfSaturatedMass: averages.drySurfaceSaturatedMass * samples.length,
          sumOfSubmergedMass: averages.submergedMass * samples.length,
          stability: averages.stability,
          fluency: averages.fluency,
          diametricalCompressionStrength: averages.diametricalCompressionStrength,
          temperatureOfWater,
          maxSpecificGravity: usedMaxSpecifyGravity,
        };

        const result = await this.calculateVolumetricParameters(sampleData);
        pointsOfCurveDosageVv.push(...result.pointsOfCurveDosageVv);
        pointsOfCurveDosageRBV.push(...result.pointsOfCurveDosageRBV);
        volumetricParameters.push(...result.volumetricParameters);
      }

      return { volumetricParameters, pointsOfCurveDosageRBV, pointsOfCurveDosageVv };
    } catch (error) {
      handleError(error, 'Failed to set volumetric parameters.');
      throw error;
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

      const sampleVolumes = VolumetricCalculationsUtil.calculateSampleVolumes(sumOfSaturatedMass, sumOfSubmergedMass);
      const apparentBulkSpecificGravity = VolumetricCalculationsUtil.calculateApparentBulkSpecificGravity(
        sumOfDryMass,
        sampleVolumes,
        temperatureOfWater,
      );
      const volumeVoids = VolumetricCalculationsUtil.calculateVolumeVoids(
        maxSpecificGravity,
        apparentBulkSpecificGravity,
      );
      const voidsFilledAsphalt = VolumetricCalculationsUtil.calculateVoidsFilledAsphalt(
        apparentBulkSpecificGravity,
        asphaltContent,
      );
      const aggregateVolumeVoids = VolumetricCalculationsUtil.calculateAggregateVolumeVoids(
        volumeVoids,
        voidsFilledAsphalt,
      );
      const ratioBitumenVoid = VolumetricCalculationsUtil.calculateRatioBitumenVoid(
        voidsFilledAsphalt,
        aggregateVolumeVoids,
      );

      const volumetricParameters = [
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
      ];

      const pointsOfCurveDosageVv = [{ x: asphaltContent, y: volumeVoids }];
      const pointsOfCurveDosageRBV = [{ x: asphaltContent, y: ratioBitumenVoid }];

      return { pointsOfCurveDosageVv, pointsOfCurveDosageRBV, volumetricParameters };
    } catch (error) {
      handleError(error, 'Failed to calculate volumetric parameters');
      throw error;
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

      // Calcula médias
      const averages = DataProcessingUtil.calculateAverages(valuesOfVolumetricParameters, [
        'dryMass',
        'submergedMass',
        'drySurfaceSaturatedMass',
        'stability',
        'fluency',
        'diametricalCompressionStrength',
      ]);

      const sampleVolumes = VolumetricCalculationsUtil.calculateSampleVolumes(
        averages.drySurfaceSaturatedMass,
        averages.submergedMass,
      );

      const apparentBulkSpecificGravity = VolumetricCalculationsUtil.calculateApparentBulkSpecificGravity(
        averages.dryMass,
        sampleVolumes,
        temperatureOfWater,
      );

      const volumeVoids = VolumetricCalculationsUtil.calculateVolumeVoids(
        confirmedSpecificGravity,
        apparentBulkSpecificGravity,
      );
      const voidsFilledAsphalt = VolumetricCalculationsUtil.calculateVoidsFilledAsphalt(
        apparentBulkSpecificGravity,
        optimumContent,
      );
      const aggregateVolumeVoids = VolumetricCalculationsUtil.calculateAggregateVolumeVoids(
        volumeVoids,
        voidsFilledAsphalt,
      );
      const ratioBitumenVoid = VolumetricCalculationsUtil.calculateRatioBitumenVoid(
        voidsFilledAsphalt,
        aggregateVolumeVoids,
      );

      const quantitative = VolumetricCalculationsUtil.calculateQuantitative(
        confirmedSpecificGravity,
        confirmedPercentsOfDosage,
        listOfSpecificGravities,
      );

      quantitative.unshift(optimumContent * 10 * confirmedSpecificGravity);

      return {
        valuesOfVolumetricParameters,
        asphaltContent: optimumContent,
        quantitative,
        values: {
          volumeVoids,
          apparentBulkSpecificGravity,
          voidsFilledAsphalt,
          aggregateVolumeVoids,
          ratioBitumenVoid,
          stability: averages.stability,
          fluency: averages.fluency,
          indirectTensileStrength: averages.diametricalCompressionStrength,
        },
      };
    } catch (error) {
      handleError(error, 'Failed to confirm volumetric parameters');
      throw error;
    }
  }

  temperaturesOfWater(name: string): number | undefined {
    return WATER_TEMPERATURE_DENSITY[name];
  }

  /*Mesmo tipado, o codigo ainda contem incongruencias. Deveria ser generalName.name, nao? e nao volumetricPaD.name, 
  Talvez por isso step6 quebra.
  */
  async saveVolumetricParametersData(
    body: SaveVolumetricParametersRequestDTO,
    userId: string,
  ): Promise<SaveVolumetricParametersResponseDTO> {
    try {
      this.logger.log('Saving marshall volumetric parameters', { body });

      const marshallExists = (await this.marshallRepository.findOne(
        body.volumetricParametersData.name || '',
        userId,
      )) as any;

      if (!marshallExists) {
        throw new Error('Marshall not found');
      }

      const { name: materialName, ...volumetricParametersWithoutName } = body.volumetricParametersData;

      await this.marshallModel.updateOne(
        { _id: marshallExists._id },
        { $set: { volumetricParametersData: volumetricParametersWithoutName } },
      );

      const currentStep = marshallExists.generalData?.step || 0;
      if (currentStep < 6) {
        await this.marshallRepository.saveStep(marshallExists._id.toString(), 6);
      }

      return {
        success: true,
        message: 'Volumetric parameters saved successfully',
        step: currentStep < 6 ? 6 : currentStep,
      };
    } catch (error) {
      handleError(error, 'Failed to save volumetric parameters');
      throw error;
    }
  }
}
