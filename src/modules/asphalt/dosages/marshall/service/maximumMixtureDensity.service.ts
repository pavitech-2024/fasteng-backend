import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marshall, MarshallDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { MarshallRepository } from '../repository';
import { Model } from 'mongoose';
import { MaterialsRepository } from '../../../materials/repository';
import { SpecifyMassRepository } from '../../../essays/specifyMass/repository';

@Injectable()
export class MaximumMixtureDensity_Marshall_Service {
  private logger = new Logger(MaximumMixtureDensity_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>,
    private readonly marshallRepository: MarshallRepository,
    private readonly materialsRepository: MaterialsRepository,
    private readonly specificMassRepository: SpecifyMassRepository,
  ) {}

  async getIndexesOfMissesSpecificGravity(aggregates: any[]) {
    try {
      if (!aggregates || !Array.isArray(aggregates) || aggregates.length === 0) {
        throw new Error('Aggregates array is required and must not be empty');
      }

      this.logger.log(`Getting indexes for ${aggregates.length} aggregates`);

      const materials = aggregates.map((element) => element._id);

      const materialsData = await Promise.all(
        materials.map((materialId) =>
          this.specificMassRepository.findOne({
            'generalData.material._id': materialId,
          }),
        ),
      );

      const missesSpecificGravity = materialsData.map((material, index) => {
        if (!material) {
          this.logger.warn(`Material ${materials[index]} not found in SpecifyMass database`);
          return {
            value: 2.65,
            _id: materials[index],
            name: aggregates[index]?.name || `Material ${index + 1}`,
            hasRealData: false,
            status: 'not_found',
          };
        }

        let bulkSpecifyMass: number | null = null;
        const resultsAny = material.results as any;

        if (resultsAny?.bulk_specify_mass !== undefined) {
          bulkSpecifyMass = resultsAny.bulk_specify_mass;
        } else if (resultsAny?.data?.bulk_specify_mass !== undefined) {
          bulkSpecifyMass = resultsAny.data.bulk_specify_mass;
        }

        if (!bulkSpecifyMass || bulkSpecifyMass <= 0 || bulkSpecifyMass > 5) {
          this.logger.warn(
            `Invalid bulk_specify_mass (${bulkSpecifyMass}) for material ${material._id}, using fallback`,
          );
          bulkSpecifyMass = 2.65;
        }

        const isRealData = bulkSpecifyMass !== 2.65;

        return {
          value: bulkSpecifyMass,
          _id: material._id.toString(),
          name: material.generalData.material.name,
          materialType: material.generalData.material.type,
          hasRealData: isRealData,
          status: isRealData ? 'real_data' : 'fallback',
        };
      });

      return {
        missesSpecificGravity,
        summary: {
          totalAggregates: aggregates.length,
          foundInDb: materialsData.filter(Boolean).length,
          hasRealData: missesSpecificGravity.filter((i) => i.hasRealData).length,
          usingFallback: missesSpecificGravity.filter((i) => !i.hasRealData).length,
        },
      };
    } catch (error) {
      this.logger.error(`Error in getIndexesOfMissesSpecificGravity: ${error.message}`);
      this.logger.error(error.stack);
      throw error;
    }
  }

  async calculateGmmData(body: any) {
    try {
      const { gmm: valuesOfGmm, temperatureOfWaterGmm, aggregates } = body;

      if (!valuesOfGmm || !Array.isArray(valuesOfGmm)) {
        throw new Error('GMM values are required and must be an array');
      }

      if (!aggregates || !Array.isArray(aggregates)) {
        throw new Error('Aggregates are required and must be an array');
      }

      const gmm = Array.from({ length: 5 }, (_, i) => {
        return valuesOfGmm.find((item) => item.id - 1 === i) || null;
      });

      const content = gmm.map((gmmItem, index) => {
        if (!gmmItem) return null;

        if (gmmItem.value !== undefined && gmmItem.value !== null) {
          return gmmItem.value;
        }

        const hasRequiredFields =
          gmmItem.massOfDrySample !== undefined &&
          gmmItem.massOfContainer_Water_Sample !== undefined &&
          gmmItem.massOfContainer_Water !== undefined &&
          temperatureOfWaterGmm !== undefined;

        if (!hasRequiredFields) {
          this.logger.warn(`Missing required fields for GMM calculation at index ${index}`);
          return null;
        }

        const massDry = Number(gmmItem.massOfDrySample);
        const massContainerWaterSample = Number(gmmItem.massOfContainer_Water_Sample);
        const massContainerWater = Number(gmmItem.massOfContainer_Water);
        const tempWater = Number(temperatureOfWaterGmm);

        if ([massDry, massContainerWaterSample, massContainerWater, tempWater].some(isNaN)) {
          this.logger.warn(`Invalid numeric values for GMM calculation at index ${index}`);
          return null;
        }

        const denominator = massDry - (massContainerWaterSample - massContainerWater);

        if (Math.abs(denominator) < 0.0001) {
          this.logger.warn(`Division by near-zero value in GMM calculation at index ${index}`);
          return null;
        }

        const result = (massDry / denominator) * tempWater;

        if (!isFinite(result) || result <= 0) {
          this.logger.warn(`Invalid GMM result at index ${index}: ${result}`);
          return null;
        }

        return result;
      });

      const maxSpecificGravity = {
        result: {
          lessOne: content[0],
          lessHalf: content[1],
          normal: content[2],
          plusHalf: content[3],
          plusOne: content[4],
        },
        method: 'GMM',
      };

      return { maxSpecificGravity };
    } catch (error) {
      this.logger.error(`Error in calculateGmmData: ${error.message}`);
      this.logger.error(error.stack);
      throw error;
    }
  }

  async calculateRiceTest(body: any) {
    this.logger.log('calculate rice test > [body]', { body });
    try {
      return body.map((item) => ({
        id: item.id,
        Teor: item.teor,
        GMM:
          item.massOfDrySample /
          (item.massOfDrySample -
            (item.massOfContainerWaterSample - item.massOfContainerWater)),
      }));
    } catch (error) {
      throw new Error('Failed to calculate rice test.');
    }
  }

  async saveMistureMaximumDensityData(body: any, userId: string) {
    try {
      const { name } = body.maximumMixtureDensityData;

      const marshallExists: any = await this.marshallRepository.findOne(name, userId);

      const {
        name: materialName,
        ...maximumMixtureDensityWithoutName
      } = body.maximumMixtureDensityData;

      const marshallWithMaximumMixtureDensity = {
        ...marshallExists._doc,
        maximumMixtureDensityData: maximumMixtureDensityWithoutName,
      };

      await this.marshallModel.updateOne(
        { _id: marshallExists._doc._id },
        marshallWithMaximumMixtureDensity,
      );

      if (marshallExists._doc.generalData.step < 5) {
        await this.marshallRepository.saveStep(marshallExists, 5);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
