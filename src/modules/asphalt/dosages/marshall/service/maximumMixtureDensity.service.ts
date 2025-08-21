//Codigo refatorado, utilizando os dtos corretos para cada void, mas com promise<any> ||
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marshall, MarshallDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { MarshallRepository } from '../repository';
import { Model } from 'mongoose';
import { MaterialsRepository } from '../../../materials/repository';
import { SpecifyMassRepository } from '../../../essays/specifyMass/repository';
import { GetIndexesOfMissesSpecificGravityDTO } from '../dto/get-indexes-of-misses-specific-gravity.dto';
import { CalculateDmtDataDTO } from '../dto/calculate-dmt-data.dto';
import { CalculateGmmDataDTO } from '../dto/calculate-gmm-data.dto';
  import { CalculateRiceTestDTO } from '../dto/calculate-rice-test.dto';
import { SaveMaximumMixtureDensityDataDTO } from '../dto/save-maximum-mixture-density-data.dto';

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

  async getIndexesOfMissesSpecificGravity(dto: GetIndexesOfMissesSpecificGravityDTO) {
    try {
      const materials = dto.aggregates.map((element) => element._id);

      const getIndexesOfMissesSpecificGravity = async () => {
        const materialsData = await Promise.all(
          materials.map((materialId) =>
            this.specificMassRepository.findOne({
              'generalData.material._id': materialId,
            }),
          ),
        );

        const withoutExperimentSpecificGravity = materialsData
          .map((material) => {
            if (material && material.results && material.results.data) {
              return {
                value: material.results.data.bulk_specify_mass, // Corrigido aqui
                _id: material._id.toString(),
                name: material.generalData.material.name,
              };
            }
            return null;
          })
          .filter((index) => index !== null);

        return { missesSpecificGravity: withoutExperimentSpecificGravity };
      };

      return await getIndexesOfMissesSpecificGravity();
    } catch (error) {
      throw new Error('Failed to calculate max specific gravity.');
    }
  }

  async calculateDmtData(dto: CalculateDmtDataDTO): Promise<any> {
    try {
      const { indexesOfMissesSpecificGravity, missingSpecificGravity, percentsOfDosage, aggregates, trial } = dto;

      let denominadorLessOne = 0;
      let denominadorLessHalf = 0;
      let denominador = 0;
      let denominadorPlusHalf = 0;
      let denominadorPlusOne = 0;

      const materials = aggregates.map((element) => element._id);

      const calculate = async (): Promise<any> => {
        try {
          const listOfMaterials = await Promise.all(
            materials.map((materialId) =>
              this.specificMassRepository.findOne({
                'generalData.material._id': materialId,
              }),
            ),
          );

          let listOfSpecificGravities = [];
          let cont = 0;

          for (let i = 0; i < listOfMaterials.length; i++) {
            listOfSpecificGravities.push(null);
            if (listOfMaterials[i] && listOfMaterials[i].results && listOfMaterials[i].results.data) {
              if (
                listOfMaterials[i].generalData.material.type === 'coarseAggregate' ||
                listOfMaterials[i].generalData.material.type === 'fineAggregate'
              ) {
                const experiment = await this.specificMassRepository.findOne({
                  'generalData.material._id': listOfMaterials[i].generalData.material._id,
                });
                
                if (experiment && experiment.results && experiment.results.data) {
                  listOfSpecificGravities[i] = experiment.results.data.bulk_specify_mass; // Corrigido aqui
                  denominadorLessOne += percentsOfDosage[i][4] / listOfSpecificGravities[i];
                  denominadorLessHalf += percentsOfDosage[i][3] / listOfSpecificGravities[i];
                  denominador += percentsOfDosage[i][2] / listOfSpecificGravities[i];
                  denominadorPlusHalf += percentsOfDosage[i][1] / listOfSpecificGravities[i];
                  denominadorPlusOne += percentsOfDosage[i][0] / listOfSpecificGravities[i];
                }
              }
            } else {
              const MissingGravitiesArray = [
                Number(missingSpecificGravity.material_1),
                Number(missingSpecificGravity.material_2),
              ];
              listOfSpecificGravities[i] = MissingGravitiesArray[cont];
              denominadorLessOne += percentsOfDosage[i][4] / listOfSpecificGravities[i];
              denominadorLessHalf += percentsOfDosage[i][3] / listOfSpecificGravities[i];
              denominador += percentsOfDosage[i][2] / listOfSpecificGravities[i];
              denominadorPlusHalf += percentsOfDosage[i][1] / listOfSpecificGravities[i];
              denominadorPlusOne += percentsOfDosage[i][0] / listOfSpecificGravities[i];
              cont++;
            }
          }

          const maxSpecificGravity = {
            result: {
              lessOne: 100 / (denominadorLessOne + (trial - 1) / 1.03),
              lessHalf: 100 / (denominadorLessHalf + (trial - 0.5) / 1.03),
              normal: 100 / (denominador + trial / 1.03),
              plusHalf: 100 / (denominadorPlusHalf + (trial + 0.5) / 1.03),
              plusOne: 100 / (denominadorPlusOne + (trial + 1) / 1.03),
            },
            method: 'DMT',
          };

          return { maxSpecificGravity, listOfSpecificGravities };
        } catch (error) {
          throw new Error('Failed to calculate max specific gravity.');
        }
      };

      const result = await calculate();
      return result;
    } catch (error) {
      throw new Error('Failed to calculate max specific gravity.');
    }
  }

  async calculateGmmData(dto: CalculateGmmDataDTO) {
    try {
      const { gmm: valuesOfGmm, temperatureOfWaterGmm, aggregates } = dto;

      const materials = aggregates.map((element) => element._id);

      const calculate = async (): Promise<any> => {
        try {
          const listOfMaterials = await Promise.all(
            materials.map((materialId) =>
              this.specificMassRepository.findOne({
                'generalData.material._id': materialId,
              }),
            ),
          );

          let listOfSpecificGravities = [];

          for (let i = 0; i < listOfMaterials.length; i++) {
            listOfSpecificGravities.push(null);

            if (
              listOfMaterials[i] && 
              listOfMaterials[i].results && 
              listOfMaterials[i].results.data &&
              (
                listOfMaterials[i].generalData.material.type === 'coarseAggregate' ||
                listOfMaterials[i].generalData.material.type === 'fineAggregate' ||
                listOfMaterials[i].generalData.material.type === 'filler'
              )
            ) {
              listOfSpecificGravities[i] = listOfMaterials[i].results.data.bulk_specify_mass; // Corrigido aqui
            }
          }

          return listOfSpecificGravities;
        } catch (error) {
          throw new Error('Failed to calculate max specific gravity.');
        }
      };

      const gmm = Array.from({ length: 5 }, (_, i) => {
        const gmmItem = valuesOfGmm.find(gmm => gmm.id - 1 === i);
        return gmmItem || null;
      });

      const content = gmm.map(gmmItem => {
        if (gmmItem && !gmmItem.value) {
          const denominator = gmmItem.massOfContainerWaterSample - gmmItem.massOfContainerWater; // Corrigido aqui
          return (gmmItem.massOfDrySample / (gmmItem.massOfDrySample - denominator)) * temperatureOfWaterGmm;
        }
        return gmmItem?.value || null;
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

      const listOfSpecificGravities = await calculate();

      return { maxSpecificGravity, listOfSpecificGravities };
    } catch (error) {
      throw new Error('Failed to calculate max specific gravity GMM.');
    }
  }

  async calculateRiceTest(dto: CalculateRiceTestDTO): Promise<any> {
    this.logger.log('calculate rice test > [dto]', { dto });
    try {
      const maxSpecificGravity = dto.riceTest.map((item) => {
        return {
          id: item.id,
          Teor: item.teor,
          GMM:
            item.massOfDrySample /
            (item.massOfDrySample - (item.massOfContainerWaterSample - item.massOfContainerWater)),
        };
      });

      return maxSpecificGravity;
    } catch (error) {
      throw new Error('Failed to calculate rice test.');
    }
  }

  async saveMistureMaximumDensityData(dto: SaveMaximumMixtureDensityDataDTO, userId: string) {
    try {
      this.logger.log('save marshall maximum mixture density data', { dto });

      const { name } = dto;

      const marshallExists: any = await this.marshallRepository.findOne(name, userId);

      const { name: materialName, ...maximumMixtureDensityWithoutName } = dto;

      const marshallWithMaximumMixtureDensity = {
        ...marshallExists._doc,
        maximumMixtureDensityData: maximumMixtureDensityWithoutName,
      };

      await this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithMaximumMixtureDensity);

      if (marshallExists._doc.generalData.step < 5) {
        await this.marshallRepository.saveStep(marshallExists, 5);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}