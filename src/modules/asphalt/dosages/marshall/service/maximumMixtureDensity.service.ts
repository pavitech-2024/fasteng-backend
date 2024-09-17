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

  async getIndexesOfMissesSpecificGravity(aggregates: any) {
    try {
      let materials = aggregates.map((element) => element._id);

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
            return { 
              value: material.results.bulk_specify_mass,
              _id: material._id.toString(),
              name: material.generalData.material.name
            };
          })
          .filter((index) => index !== null);

        return { missesSpecificGravity: withoutExperimentSpecificGravity };
      };

      return await getIndexesOfMissesSpecificGravity();
    } catch (error) {
      throw new Error('Failed to calculate max specific gravity.');
    }
  }

  async calculateDmtData(body: any): Promise<any> {
    try {
      const { indexesOfMissesSpecificGravity, missingSpecificGravity, percentsOfDosage, aggregates, trial } = body;

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
            if (listOfMaterials[0] !== null) {
              if (
                listOfMaterials[i].generalData.material.type === 'coarseAggregate' ||
                listOfMaterials[i].generalData.material.type === 'fineAggregate'
              ) {
                let experiment: any = await this.specificMassRepository.findOne({
                  'generalData.material._id': listOfMaterials[i].generalData.material._id,
                });
                listOfSpecificGravities[i] = experiment.results.bulk_specify_mass;
                denominadorLessOne += percentsOfDosage[i][4] / listOfSpecificGravities[i];
                denominadorLessHalf += percentsOfDosage[i][3] / listOfSpecificGravities[i];
                denominador += percentsOfDosage[i][2] / listOfSpecificGravities[i];
                denominadorPlusHalf += percentsOfDosage[i][1] / listOfSpecificGravities[i];
                denominadorPlusOne += percentsOfDosage[i][0] / listOfSpecificGravities[i];
              }
            } else {
              // to-do: Fazer vir do front como array de números;
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

  async calculateGmmData(body: any) {
    try {
      const { gmm: valuesOfGmm, temperatureOfWaterGmm, aggregates } = body;

      const materials = aggregates.map((element) => element._id);

      const calculate = async (): Promise<any> => {
        try {
          let materialsOrNot;
          const listOfMaterials = await Promise.all(
            materials.map((materialId) =>
              this.specificMassRepository.findOne({
                'generalData.material._id': materialId,
              }),
            ),
          );

          if (listOfMaterials[0] !== null) {
            materialsOrNot = listOfMaterials;
          } else {
            materialsOrNot = materials;
          }

          let listOfSpecificGravities = [];

          for (let i = 0; i < materialsOrNot.length; i++) {
            listOfSpecificGravities.push(null);

            if (
              materialsOrNot[i].generalData.material.type === 'coarseAggregate' ||
              materialsOrNot[i].generalData.material.type === 'fineAggregate' ||
              materialsOrNot[i].generalData.material.type === 'filler'
            ) {
              listOfSpecificGravities[i] = materialsOrNot[i].results.bulk_specify_mass;
            }
          }

          return listOfSpecificGravities;
        } catch (error) {
          throw new Error('Failed to calculate max specific gravity.');
        }
      };

      let gmm = [];

      for (let i = 0; i < 5; i++) {
        const gmmAtual = valuesOfGmm.find((gmm) => gmm.id - 1 === i);
        if (gmmAtual) gmm.push(gmmAtual);
        else gmm.push(null);
      }

      const content = gmm.map((gmm) => {
        if (gmm !== null) {
          if (gmm.insert) return gmm.value;
          else
            return (
              (gmm.massOfDrySample /
                (gmm.massOfDrySample - (gmm.massOfContainer_Water_Sample - gmm.massOfContainer_Water))) *
              temperatureOfWaterGmm
            );
        } else return null;
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

  async calculateRiceTest(body): Promise<any> {
    try {
      // console.log(gmm);
      // if (gmm.insert) return gmm.value;

      const maxSpecificGravity = body.map((item) => {
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

  async saveStep5Data(body: any, userId: string) {
    try {
      this.logger.log('save marshall binder trial step on maximum-mixture-density.marshall.service.ts > [body]', {
        body,
      });

      const { name } = body.maximumMixtureDensityData;

      const marshallExists: any = await this.marshallRepository.findOne(name, userId);

      const { name: materialName, ...maximumMixtureDensityWithoutName } = body.maximumMixtureDensityData;

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
