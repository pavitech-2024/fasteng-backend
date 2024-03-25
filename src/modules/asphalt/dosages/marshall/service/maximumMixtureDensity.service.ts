import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marshall, MarshallDocument } from '../schemas';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { MarshallRepository } from '../repository';
import { Model } from 'mongoose';
import { MaterialsRepository } from 'modules/asphalt/materials/repository';
import { SpecifyMassRepository } from 'modules/asphalt/essays/specifyMass/repository';

@Injectable()
export class maximumMixtureDensity_Marshall_Service {
  private logger = new Logger(maximumMixtureDensity_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModule: Model<MarshallDocument>,
    private readonly marshallRepository: MarshallRepository,
    private readonly materialsRepository: MaterialsRepository,
    private readonly specificMassRepository: SpecifyMassRepository,
  ) {}

  // async getIndexesOfMissesSpecificGravity(aggregates: any) {
  //   try {

  //     let materials = [];

  //     aggregates.forEach(element => {
  //       materials.push(element._id)
  //     });

  //     const getIndexesOfMissesSpecificGravity = async () => {
  //        await Promise.all(materials.map(materialId =>
  //         this.specificMassRepository.findOne({
  //           "generalData.material._id": materialId
  //         })))
  //       .then(materials => {
  //         const withoutExperimentSpecificGravity = materials.map((material, i) => {
  //           if (!(material.generalData.material.type === 'coarseAggregate' || material.generalData.material.type === 'fineAggregate')) return i;
  //           else return;
  //         })
  //         return { withoutExperimentSpecificGravity }
  //       })
  //       getIndexesOfMissesSpecificGravity();
  //     }

  //     return getIndexesOfMissesSpecificGravity
  //   } catch (error) {
  //     throw new Error('Failed to calculate max specific gravity.');
  //   }
  // }

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
          .map((material, i) => {
            if (
              !(
                material &&
                (material.generalData.material.type === 'coarseAggregate' ||
                  material.generalData.material.type === 'fineAggregate')
              )
            ) {
              return i;
            } else {
              return null;
            }
          })
          .filter((index) => index !== null);

        return { indexesOfMissesSpecificGravity: withoutExperimentSpecificGravity };
      };

      return await getIndexesOfMissesSpecificGravity();
    } catch (error) {
      throw new Error('Failed to calculate max specific gravity.');
    }
  }

  async calculateDmtData(body: any): Promise<any> {
    const { indexesOfMissesSpecificGravity, missingSpecificGravity, percentsOfDosage, aggregates, trial } = body;

    try {
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

          for (let i = 0; i < listOfMaterials.length; i++) {
            listOfSpecificGravities.push(null);
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

          return maxSpecificGravity;
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

  async calculateMaxSpecificGravityGMM(body: any) {
    try {
      const { valuesOfGmm, temperatureOfWaterGmm, aggregates } = body;

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
              listOfMaterials[i].generalData.material.type === 'coarseAggregate' ||
              listOfMaterials[i].generalData.material.type === 'fineAggregate'
            ) {
              listOfSpecificGravities[i] = listOfMaterials[i].results.bulk_specify_mass;
            }
          }

          return listOfSpecificGravities;
        } catch (error) {
          throw new Error('Failed to calculate max specific gravity.');
        }
      };

      let gmm = [];

      for (let i = 0; i < 5; i++) {
        const gmmAtual = valuesOfGmm.find((gmm) => gmm.index === i);
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

      return maxSpecificGravity;
    } catch (error) {
      throw new Error('Failed to calculate max specific gravity GMM.');
    }
  }

  async calculateRiceTest(gmm): Promise<any> {
    try {
      console.log(gmm);
      if (gmm.insert) return gmm.value;

      else
      return (
        gmm.massOfDrySample / (gmm.massOfDrySample - (gmm.massOfContainer_Water_Sample - gmm.massOfContainer_Water))
      );
    } catch (error) {
      throw new Error('Failed to calculate rice test.');
    }
  };
}
