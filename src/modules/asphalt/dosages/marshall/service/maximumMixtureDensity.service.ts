import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Marshall, MarshallDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { MarshallRepository } from '../repository';
import { Model } from 'mongoose';
import { MaterialsRepository } from '../../../materials/repository';
import { SpecifyMassRepository } from '../../../essays/specifyMass/repository';
import { Calc_SPECIFYMASS_Out } from '../../../essays/specifyMass/dto/calc.specifyMass.dto';

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
//
async getIndexesOfMissesSpecificGravity(aggregates: any) {
  try {
    if (!aggregates || !Array.isArray(aggregates) || aggregates.length === 0) {
      throw new Error('Aggregates array is required and must not be empty');
    }

    this.logger.log(`Getting indexes for ${aggregates.length} aggregates`);
    
    let materials = aggregates.map((element) => element._id);

    const getIndexesOfMissesSpecificGravity = async (materialsArray: string[]) => { // ← ADICIONAR PARÂMETRO
      const materialsData = await Promise.all(
        materialsArray.map((materialId) =>
          this.specificMassRepository.findOne({
            'generalData.material._id': materialId,
          }),
        ),
      );

      this.logger.log(`Found ${materialsData.filter(m => m !== null).length} material records`);

      const withoutExperimentSpecificGravity = materialsData
        .map((material, index) => {
          if (!material) {
            this.logger.warn(`Material ${materialsArray[index]} not found in SpecifyMass database`);
            // Fallback para material não encontrado
            return {
              value: 2.65,
              _id: materialsArray[index],
              name: aggregates[index]?.name || `Material ${index + 1}`,
              hasRealData: false,
              status: 'not_found'
            };
          }

          // EXTRAIR bulk_specify_mass - COM TYPE ASSERTION CORRETO
          let bulkSpecifyMass: number | null = null;
          
          // VERIFICAÇÃO 1: material.results.bulk_specify_mass (ESTRUTURA ATUAL)
          const resultsAny = material.results as any; // Type assertion para any
          if (resultsAny && resultsAny.bulk_specify_mass !== undefined) {
            bulkSpecifyMass = resultsAny.bulk_specify_mass;
            this.logger.log(`Using bulk_specify_mass from results (direct): ${bulkSpecifyMass}`);
          }
          // VERIFICAÇÃO 2: material.results.data.bulk_specify_mass (ESTRUTURA ANTIGA)
          else if (resultsAny?.data?.bulk_specify_mass !== undefined) {
            bulkSpecifyMass = resultsAny.data.bulk_specify_mass;
            this.logger.log(`Using bulk_specify_mass from results.data: ${bulkSpecifyMass}`);
          }
          
          // VALIDAÇÃO do valor
          if (bulkSpecifyMass === null || bulkSpecifyMass === undefined) {
            this.logger.warn(`bulk_specify_mass is null/undefined for material: ${material._id}`);
            bulkSpecifyMass = 2.65; // fallback
          } else if (bulkSpecifyMass <= 0 || bulkSpecifyMass > 5) {
            // Valores inválidos como -4.99
            this.logger.warn(`Invalid bulk_specify_mass value (${bulkSpecifyMass}) for material: ${material._id}`);
            bulkSpecifyMass = 2.65; // fallback para valor inválido
          }

          const materialType = material.generalData?.material?.type as 
            'coarseAggregate' | 'fineAggregate' | 'filler' | 'asphaltBinder' | 'CAP' | 'other';
          
          const isRealData = bulkSpecifyMass !== 2.65 && bulkSpecifyMass > 0 && bulkSpecifyMass <= 5;

          return {
            value: bulkSpecifyMass,
            _id: material._id.toString(),
            name: material.generalData.material.name,
            materialType: materialType,
            hasRealData: isRealData,
            status: isRealData ? 'real_data' : 'fallback'
          };
        });

      this.logger.log(`Returning ${withoutExperimentSpecificGravity.length} indexes`);
      
      // Filtrar apenas válidos
      const validIndexes = withoutExperimentSpecificGravity.filter(index => index !== null);

      return { 
        missesSpecificGravity: validIndexes,
        summary: {
          totalAggregates: aggregates.length,
          foundInDb: materialsData.filter(m => m !== null).length,
          hasRealData: validIndexes.filter(i => i.hasRealData).length,
          usingFallback: validIndexes.filter(i => !i.hasRealData).length
        }
      };
    };

    return await getIndexesOfMissesSpecificGravity(materials); // ← PASSAR O PARÂMETRO
  } catch (error) {
    this.logger.error(`Error in getIndexesOfMissesSpecificGravity: ${error.message}`);
    this.logger.error(`Full error: ${error.stack}`);
    throw new Error(`Failed to calculate max specific gravity: ${error.message}`);
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

    // Validação inicial
    if (!valuesOfGmm || !Array.isArray(valuesOfGmm)) {
      throw new Error('GMM values are required and must be an array');
    }

    if (!aggregates || !Array.isArray(aggregates)) {
      throw new Error('Aggregates are required and must be an array');
    }

    const materials = aggregates.map((element) => element._id);

    const calculate = async (): Promise<any[]> => {
      try {
        const listOfMaterials = await Promise.all(
          materials.map((materialId) =>
            this.specificMassRepository.findOne({
              'generalData.material._id': materialId,
            }),
          ),
        );

        const listOfSpecificGravities = [];

        for (let i = 0; i < listOfMaterials.length; i++) {
          const material = listOfMaterials[i];
          
          // Verificar se o material existe
          if (!material) {
            listOfSpecificGravities.push(null);
            continue;
          }

          // Verificar se tem generalData
          if (!material.generalData || !material.generalData.material) {
            listOfSpecificGravities.push(null);
            continue;
          }

          const materialType = material.generalData.material.type;
          const isAggregate = ['coarseAggregate', 'fineAggregate', 'filler'].includes(materialType);
          
          // Acessar a estrutura correta: material.results.data
          let bulkSpecifyMass = null;
          
          if (material.results && 
              material.results.data && 
              material.results.data.bulk_specify_mass !== undefined) {
            bulkSpecifyMass = material.results.data.bulk_specify_mass;
          } 
          
          if (isAggregate && bulkSpecifyMass !== null) {
            listOfSpecificGravities.push(bulkSpecifyMass);
          } else {
            listOfSpecificGravities.push(null);
          }
        }

        return listOfSpecificGravities;
      } catch (error) {
        this.logger.error(`Error in calculate function: ${error.message}`);
        throw new Error('Failed to calculate specific gravities from database.');
      }
    };

    // Processar valores GMM com validação
    const gmm = Array.from({ length: 5 }, (_, i) => {
      const gmmItem = valuesOfGmm.find(gmm => gmm.id - 1 === i);
      return gmmItem || null;
    });

    const content = gmm.map((gmmItem, index) => {
      if (!gmmItem) {
        this.logger.warn(`GMM item ${index + 1} is missing`);
        return null;
      }

      // Se já tem value, retorna
      if (gmmItem.value !== undefined && gmmItem.value !== null) {
        return gmmItem.value;
      }

      // Verificar se tem os dados necessários para o cálculo
      const hasRequiredFields = 
        gmmItem.massOfDrySample !== undefined &&
        gmmItem.massOfContainer_Water_Sample !== undefined &&
        gmmItem.massOfContainer_Water !== undefined &&
        temperatureOfWaterGmm !== undefined;

      if (!hasRequiredFields) {
        this.logger.warn(`Missing required fields for GMM calculation at index ${index}`);
        return null;
      }

      // Validar valores antes do cálculo
      const massDry = parseFloat(gmmItem.massOfDrySample);
      const massContainerWaterSample = parseFloat(gmmItem.massOfContainer_Water_Sample);
      const massContainerWater = parseFloat(gmmItem.massOfContainer_Water);
      const tempWater = parseFloat(temperatureOfWaterGmm);

      if (isNaN(massDry) || isNaN(massContainerWaterSample) || isNaN(massContainerWater) || isNaN(tempWater)) {
        this.logger.warn(`Invalid numeric values for GMM calculation at index ${index}`);
        return null;
      }

      const denominator = massContainerWaterSample - massContainerWater;
      const difference = massDry - denominator;

      // Evitar divisão por zero ou números muito pequenos
      if (Math.abs(difference) < 0.0001) {
        this.logger.warn(`Division by near-zero value in GMM calculation at index ${index}`);
        return null;
      }

      const result = (massDry / difference) * tempWater;

      // Validar resultado
      if (isNaN(result) || !isFinite(result) || result <= 0) {
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

    const listOfSpecificGravities = await calculate();

    return { maxSpecificGravity, listOfSpecificGravities };
  } catch (error) {
    this.logger.error(`Error in calculateGmmData: ${error.message}`);
    this.logger.error(`Stack trace: ${error.stack}`);
    throw new Error(`Failed to calculate max specific gravity GMM: ${error.message}`);
  }
}

  async calculateRiceTest(body): Promise<any> {
    this.logger.log('calculate rice test > [body]', { body });
    try {
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

  async saveMistureMaximumDensityData(body: any, userId: string) {
    try {
      this.logger.log(
        'save marshall maximum misxture density data on maximum-mixture-density.marshall.service.ts > [body]',
        {
          body,
        },
      );

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
