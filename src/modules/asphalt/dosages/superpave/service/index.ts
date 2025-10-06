import { Injectable, Logger } from '@nestjs/common';
import { SuperpaveInitDto } from '../dto/superpave-init.dto';
import { GeneralData_Superpave_Service } from './general-data.superpave.service';
import { MaterialSelection_Superpave_Service } from './material-selection.superpave.service';
import { Superpave } from '../schemas';
import { SuperpaveRepository } from '../repository/index';
import { GranulometryComposition_Superpave_Service } from './granulometry-composition.superpave.service';
import { AsphaltGranulometryRepository } from 'modules/asphalt/essays/granulometry/repository';
import { InitialBinder_Superpave_Service } from './initial-binder.superpave.service';
import { FirstCompression_Superpave_Service } from './first-compression.service';
import { FirstCurvePercentages_Service } from './first-curve-percentages.service';
import { ChosenCurvePercentages_Superpave_Service } from './chosen-curves-percentages.service';
import { SecondCompression_Superpave_Service } from './second-compression.superpave.service';
import { SecondCompressionParameters_Superpave_Service } from './second-compression-parameters.service';
import { ResumeDosage_Superpave_Service } from './resume-dosage.service';
import { GranulometryEssay_Superpave_Service } from './granulometry-essay.service';
import { AsphaltGranulometryService } from 'modules/asphalt/essays/granulometry/service';
import { Calc_AsphaltGranulometry_Dto } from 'modules/asphalt/essays/granulometry/dto/asphalt.calc.granulometry.dto';
import { ViscosityRotationalService } from 'modules/asphalt/essays/viscosityRotational/service/viscosityRotational.service';
import { AllSievesSuperpaveUpdatedAstm } from 'utils/interfaces';
import { ConfirmCompaction_Superpave_Service } from './confirm-compaction.service';

@Injectable()
export class SuperpaveService {
  private logger = new Logger(SuperpaveService.name);

  constructor(
    private readonly superpave_repository: SuperpaveRepository,
    private readonly generalData_Service: GeneralData_Superpave_Service,
    private readonly granulometryEssay_Service: GranulometryEssay_Superpave_Service,
    private readonly materialSelection_Service: MaterialSelection_Superpave_Service,
    private readonly granulometryComposition_Service: GranulometryComposition_Superpave_Service,
    private readonly granulometryRepository: AsphaltGranulometryRepository,
    private readonly initialBinder_Service: InitialBinder_Superpave_Service,
    private readonly firstCompression_Service: FirstCompression_Superpave_Service,
    private readonly firstCompressionParams_Service: FirstCurvePercentages_Service,
    private readonly chosenCurvePercentages_Service: ChosenCurvePercentages_Superpave_Service,
    private readonly secondCompression_Service: SecondCompression_Superpave_Service,
    private readonly secondCompressionParameters_Service: SecondCompressionParameters_Superpave_Service,
    private readonly confirmCompaction_Service: ConfirmCompaction_Superpave_Service,
    private readonly resumeDosageEquation_Service: ResumeDosage_Superpave_Service,
    private readonly asphaltGranulometry_Service: AsphaltGranulometryService,
    private readonly rotationalViscosity_Service: ViscosityRotationalService,
  ) {}

  async verifyInitSuperpave(body: SuperpaveInitDto, userId: string) {
    try {
      const dosage = await this.generalData_Service.verifyInitSuperpave(body, userId);

      return dosage;
    } catch (error) {
      this.logger.error(`error on verify init > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getAllDosages(userId: string): Promise<Superpave[]> {
    try {
      // busca todas as dosagens no banco de dados
      const dosages = await this.superpave_repository.find();

      const userDosages = dosages.filter((dosage) => dosage.generalData && dosage.generalData.userId === userId);

      // retorna as dosagens encontradas que pertencem ao usuário
      return userDosages;
    } catch (error) {
      this.logger.error(`error on get all dosages > [error]: ${error}`);

      throw error;
    }
  }

  /**
   * Calcula a granulometria dos materiais de uma dosagem superpave.
   * @param body Objeto com as propriedades granulometrys (array de granulometrias) e viscosity (objeto de viscosidade).
   * @returns Um objeto com as propriedades granulometry (array de granulometrias calculadas) e success (booleano indicando se houve sucesso).
   * Caso haja erro, retorna um objeto com as propriedades error (objeto com status, name e message do erro) e success (false).
   */
  async calculateGranulometryEssayData(body: any) {
    try {
      const { granulometrys, viscosity } = body;

      const formattedBody: Calc_AsphaltGranulometry_Dto[] = granulometrys.map((item) => {
        const { material, material_mass, table_data, bottom } = item;
        return {
          generalData: material,
          step2Data: { material_mass, table_data, bottom },
        };
      });

      const results = await Promise.allSettled(
        formattedBody.map((dto) => this.asphaltGranulometry_Service.calculateGranulometry(dto)),
      );

      const granulometry = results
        .map((result, index) => {
          if (result.status === 'fulfilled') {
            return {
              ...result.value,
              material: granulometrys[index].material,
            };
          } else {
            this.logger.warn(
              `Failed to calculate material ${granulometrys[index].material?.name || index}: ${result.reason}`,
            );
            return null;
          }
        })
        .filter(Boolean); // remove os nulos

      const data = { viscosityRotational: viscosity, generalData: viscosity.material };
      const viscosityResult = await this.rotationalViscosity_Service.calculateViscosityRotational(data);

      return { granulometry, viscosity: { material: viscosity.material, result: viscosityResult }, success: true };
    } catch (error) {
      this.logger.error(`error on calculate granulometry essay data > [error]: ${error}`);
      const { status, name, message } = error;
      return { materials: [], success: false, error: { status, message, name } };
    }
  }

  async saveGranulometryEssayData(body: any, userId: string) {
    try {
      const result = await this.granulometryEssay_Service.saveGranulometryEssayData(body, userId);
      return result;
    } catch (error) {
      this.logger.error(`Error saving granulometry essay data: ${error.message}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveGranulometryEssayResults(body: any, userId: string) {
    try {
      const result = await this.granulometryEssay_Service.saveGranulometryEssayResults(body, userId);
      return result;
    } catch (error) {
      this.logger.error(`Error saving granulometry essay results: ${error.message}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  // async getUserMaterials(userId: string) {
  //   try {
  //     const materials = await this.materialSelection_Service.getMaterials(userId);

  //     this.logger.log(`materials returned > [materials]`);

  //     return { materials, success: true };
  //   } catch (error) {
  //     this.logger.error(`error on getting all materials by user id > [error]: ${error}`);
  //     const { status, name, message } = error;
  //     return { materials: [], success: false, error: { status, message, name } };
  //   }
  // }

  async getDosageById(dosageId: string) {
    try {
      const dosage = await this.generalData_Service.getDosageById(dosageId);

      this.logger.log(`dosage returned > [dosage]`);

      return { dosage, success: true };
    } catch (error) {
      this.logger.error(`error on getting dosage by id > [error]: ${error}`);
      const { status, name, message } = error;
      return { materials: [], success: false, error: { status, message, name } };
    }
  }

  //granulometry.results.result pode ser null, mas a rapazeada ta tentando acessar as propriedades diretamente por ele sem validacao
  //especificamente a parte de nominal_size. por isso da erro nos graficos (typeError)




async getGranulometricCompositionData(body: any): Promise<any> {
  try {
    const { dnitBand, aggregates } = body;
      console.log('=== BACKEND DEBUG ===');
    console.log('Body recebido:', JSON.stringify(body, null, 2));
    console.log('Aggregates count:', aggregates?.length);


    // VALIDAÇÃO INICIAL
    if (!aggregates || !Array.isArray(aggregates)) {
      throw new Error('Aggregates data is invalid');
    }
    console.log('=== ESTRUTURA COMPLETA DOS AGGREGATES ===');
aggregates?.forEach((agg, index) => {
  console.log(`Aggregate ${index} - ${agg.material?.name}:`, JSON.stringify(agg, null, 2));
  console.log('--- Chaves disponíveis:', Object.keys(agg));
  
  // Verificar diferentes possíveis locais dos dados
  console.log('Tem data?', !!agg.data);
  console.log('Tem results?', !!agg.results); 
  console.log('Tem result?', !!agg.result);
  console.log('Tem granulometryData?', !!agg.granulometryData);
  
  if (agg.data) {
    console.log('Data keys:', Object.keys(agg.data));
    console.log('Tem data.result?', !!agg.data.result);
  }
  if (agg.results) {
    console.log('Results keys:', Object.keys(agg.results));
  }
});

    let higherBand = [];
    let lowerBand = [];
    let porcentagesPassantsN200 = [];
    let nominalSize = 0;
    let percentsOfMaterials = [];
    let listOfPercentsToReturn = [];
    let indexes = [];
    let index;
    let result = {
      nominalSize: {
        controlPoints: {
          lower: [],
          higher: [],
        },
        restrictedZone: {
          lower: [],
          higher: [],
        },
        curve: [],
        value: 0,
      },
      percentsOfMaterialsToShow: [],
      percentsOfMaterials: [],
    };

    const granulometryData: {
      _id: string;
      passants: {};
    }[] = [];

    aggregates.forEach((aggregate) => {
      // VALIDAÇÃO: Verificar se aggregate.data existe
      if (!aggregate?.data) {
        return; // Pular se não existir dados
      }

      const { table_data } = aggregate.data;

      let passants = {};

      table_data.forEach((p) => {
        passants[p.sieve_label] = p.passant;
      });

      granulometryData.push({
        _id: aggregate.data.material._id,
        passants: passants,
      });
    });

    // CORREÇÃO: Adicionar validação para results.result
  percentsOfMaterials = aggregates.map((granulometry) => {
  // Se tiver results.result, usa normalmente
  if (granulometry?.results?.result) {
    const resultData = granulometry.results.result;
    
    if (resultData.nominal_size && resultData.nominal_size > nominalSize) {
      nominalSize = resultData.nominal_size;
    }

    return resultData.passant_porcentage || [];
  }
  
  // SE NÃO, PROCESSAR OS DADOS BRUTOS DO table_data
  if (granulometry?.data?.table_data) {
    console.log(`Processando dados brutos para ${granulometry.data.material.name}`);
    
    const tableData = granulometry.data.table_data;
    
    // Extrair apenas os valores de passant para criar o array de percentuais
    const passantPorcentage = tableData.map(item => [item.sieve_label, item.passant]);
    
    // Calcular nominal_size baseado nos dados
    // O nominal_size é geralmente a maior peneira onde o passant fica abaixo de 100%
    let calculatedNominalSize = 0;
    for (const item of tableData) {
      if (item.passant < 100 && item.sieve_value > calculatedNominalSize) {
        calculatedNominalSize = item.sieve_value;
      }
    }
    
    if (calculatedNominalSize > nominalSize) {
      nominalSize = calculatedNominalSize;
    }
    
    console.log(`Passant porcentage calculado para ${granulometry.data.material.name}:`, passantPorcentage);
    console.log(`Nominal size calculado: ${calculatedNominalSize}`);
    
    return passantPorcentage;
  }
  
  console.log(`Nenhum dado encontrado para ${granulometry.data?.material?.name}`);
  return [];
});

result.nominalSize.value = nominalSize;

    // CORREÇÃO: Adicionar validação no loop também
    for (let i = 0; i < aggregates.length; i++) {
  porcentagesPassantsN200[i] = null;
  
  // PRIMEIRO: Buscar o valor da peneira Nº200 (0.075mm) nos table_data
  if (aggregates[i]?.data?.table_data) {
    const n200Sieve = aggregates[i].data.table_data.find(
      item => item.sieve_value === 0.075 || item.sieve_label.includes('Nº200') || item.sieve_label.includes('0,075')
    );
    
    if (n200Sieve) {
      porcentagesPassantsN200[i] = n200Sieve.passant;
      console.log(`N200 encontrado nos table_data para ${aggregates[i].data.material.name}: ${n200Sieve.passant}%`);
    }
  }
  
  // SEGUNDO: Se não encontrou nos table_data, tenta no percentsOfMaterials (mantém sua lógica original)
  if (porcentagesPassantsN200[i] === null && percentsOfMaterials[i] && percentsOfMaterials[i].length > 0) {
    // A peneira N200 geralmente é o último item do array (índice 12)
    const n200Index = percentsOfMaterials[i].length - 1;
    if (percentsOfMaterials[i][n200Index] !== null && percentsOfMaterials[i][n200Index] !== undefined) {
      if (Array.isArray(percentsOfMaterials[i][n200Index])) {
        porcentagesPassantsN200[i] = percentsOfMaterials[i][n200Index][1];
      } else {
        porcentagesPassantsN200[i] = percentsOfMaterials[i][n200Index];
      }
      console.log(`N200 encontrado no percentsOfMaterials para índice ${i}: ${porcentagesPassantsN200[i]}%`);
    }
  }
  
  // TERCEIRO: Se ainda não encontrou, tenta o índice 6 (lógica original)
  if (porcentagesPassantsN200[i] === null && percentsOfMaterials[i] && percentsOfMaterials[i][6] !== null) {
    if (Array.isArray(percentsOfMaterials[i][6])) {
      porcentagesPassantsN200[i] = percentsOfMaterials[i][6][1];
    } else {
      porcentagesPassantsN200[i] = percentsOfMaterials[i][6];
    }
    console.log(`N200 encontrado no índice 6 para ${i}: ${porcentagesPassantsN200[i]}%`);
  }
  
  console.log(`Valor final de N200 para ${aggregates[i]?.data?.material?.name}: ${porcentagesPassantsN200[i]}`);
}


      const axisX = [38.1, 25.4, 19.1, 12.7, 9.5, 6.3, 4.8, 2.36, 1.18, 0.6, 0.3, 0.15, 0.075];

      const curve38_1 = Array(AllSievesSuperpaveUpdatedAstm.length).fill(null);
      curve38_1[0] = 100; // 38.1 mm (1 1/2 pol)
      curve38_1[curve38_1.length - 1] = 0;

      const curve25 = Array(AllSievesSuperpaveUpdatedAstm.length).fill(null);
      curve25[0] = 100; // 25.4 mm (1 pol)
      curve25[curve25.length - 1] = 0;

      const curve19 = Array(AllSievesSuperpaveUpdatedAstm.length).fill(null);
      curve19[1] = 100; // 19.1 mm (3/4 pol)
      curve19[curve19.length - 1] = 0;

      const curve12 = Array(AllSievesSuperpaveUpdatedAstm.length).fill(null);
      curve12[2] = 100; // 12.7 mm (1/2 pol)
      curve12[curve12.length - 1] = 0;

      const curve9 = Array(AllSievesSuperpaveUpdatedAstm.length).fill(null);
      curve9[3] = 100; // 9.5 mm (3/8 pol)
      curve9[curve9.length - 1] = 0;

      if (nominalSize === 38.1) {
        result.nominalSize.controlPoints.lower = [100, 90, null, null, null, null, null, 15, null, null, null, null, 0];

        result.nominalSize.controlPoints.higher = [
          100,
          90,
          null,
          null,
          null,
          null,
          null,
          41,
          null,
          null,
          null,
          null,
          null,
          6,
        ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          [
            null, // i 0
            null, // i 1
            null, // i 2
            null, // i 3
            null, // i 4
            null, // i 5
            34.7, // i 6
            23.3,
            15.5,
            11.7,
            10,
            null,
            null,
          ],
          axisX,
        );

        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          [null, null, null, null, null, null, 34.7, 27.3, 21.5, 15.7, 10, null, null],
          axisX,
        );

        result.nominalSize.curve = curve38_1;
      } else if (nominalSize === 25) {
        result.nominalSize.controlPoints.lower = [
          100, // 38.1
          90, // 25.4
          null, // 19.1
          null, // 12.7
          null, // 9.5
          null, // 6.3
          null, // 4.8
          19, // 2.36
          null, // 1.18
          null, // 0.6
          null, // 0.3
          null, // 0.15
          1, // 0.075
        ];
        result.nominalSize.controlPoints.higher = [
          null, // 38.1
          100, // 25.4
          90, // 19.1
          null, // 12.7
          null, // 9.5
          null, // 6.3
          null, // 4.8
          45, // 2.36
          null, // 1.18
          null, // 0.6
          null, // 0.3
          null, // 0.15
          7, // 0.075
        ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            39.5, // 4.8
            26.8, // 2.36
            18.1, // 1.18
            13.6, // 0.6
            11.4, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            39.5, // 4.8
            30.8, // 2.36
            24.1, // 1.18
            17.6, // 0.6
            13.7, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          axisX,
        );
        result.nominalSize.curve = curve25;
      } else if (nominalSize === 19) {
        result.nominalSize.controlPoints.lower = [
          null, // 38.1
          100, // 25.4
          90, // 19.1
          null, // 12.7
          null, // 9.5
          null, // 6.3
          null, // 4.8
          23, // 2.36
          null, // 1.18
          null, // 0.6
          null, // 0.3
          null, // 0.15
          2, // 0.075
        ];
        result.nominalSize.controlPoints.higher = [
          null, // 38.1
          null, // 25.4
          100, // 19.1
          90, // 12.7
          null, // 9.5
          null, // 6.3
          null, // 4.8
          49, // 2.36
          null, // 1.18
          null, // 0.6
          null, // 0.3
          null, // 0.15
          8, // 0.075
        ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            34.6, // 2.36
            22.3, // 1.18
            16.7, // 0.6
            13.7, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            34.6, // 2.36
            28.3, // 1.18
            20.7, // 0.6
            13.7, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          axisX,
        );
        result.nominalSize.curve = curve19;
      } else if (nominalSize === 12.5) {
        result.nominalSize.controlPoints.lower = [
          null, // 38.1
          null, // 25.4
          100, // 19.1
          90, // 12.7
          null, // 9.5
          null, // 6.3
          null, // 4.8
          28, // 2.36
          null, // 1.18
          null, // 0.6
          null, // 0.3
          null, // 0.15
          2, // 0.075
        ];
        result.nominalSize.controlPoints.higher = [
          null, // 38.1
          null, // 25.4
          null, // 19.1
          100, // 12.7
          90, // 9.5
          null, // 6.3
          null, // 4.8
          58, // 2.36
          null, // 1.18
          null, // 0.6
          null, // 0.3
          null, // 0.15
          10, // 0.075
        ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            39.1, // 2.36
            25.6, // 1.18
            19.1, // 0.6
            15.5, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          // [null, null, null, null, null, null, null, 34.7, 23.3, null, 15.5, 11.7, null],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            39.1, // 2.36
            31.6, // 1.18
            23.1, // 0.6
            15.5, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          // [null, null, null, null, null, null, null, 34.7, 27.3, null, 21.5, 15.7, null],
          axisX,
        );
        result.nominalSize.curve = curve12;
      } else if (nominalSize === 9.5) {
        result.nominalSize.controlPoints.lower = [
          null, // 38.1
          null, // 25.4
          null, // 19.1
          100, // 12.7
          90, // 9.5
          null, // 6.3
          null, // 4.8
          32, // 2.36
          null, // 1.18
          null, // 0.6
          null, // 0.3
          null, // 0.15
          2, // 0.075
        ];
        result.nominalSize.controlPoints.higher = [
          null, // 38.1
          null, // 25.4
          null, // 19.1
          null, // 12.7
          100, // 9.5
          null, // 6.3
          90, // 4.8
          67, // 2.36
          null, // 1.18
          null, // 0.6
          null, // 0.3
          null, // 0.15
          10, // 0.075
        ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            47.2, // 2.36
            31.6, // 1.18
            23.1, // 0.6
            18.7, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          // [null, null, null, null, null, null, null, null, 34.7, 23.3, null, 15.5, 11.7],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            47.2, // 2.36
            37.6, // 1.18
            37.5, // 0.6
            18.7, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          // [null, null, null, null, null, null, null, null, 34.7, 27.3, null, 21.5, 15.7],
          axisX,
        );
        result.nominalSize.curve = curve9;
      } else {
        result.nominalSize.controlPoints.lower = [
          null, // 38.1
          null, // 25.4
          100, // 19.1
          90, // 12.7
          null, // 9.5
          null, // 6.3
          null, // 4.8
          28, // 2.36
          null, // 1.18
          null, // 0.6
          null, // 0.3
          null, // 0.15
          2, // 0.075
        ];
        result.nominalSize.controlPoints.higher = [
          null, // 38.1
          null, // 25.4
          null, // 19.1
          100, // 12.7
          90, // 9.5
          null, // 6.3
          null, // 4.8
          58, // 2.36
          null, // 1.18
          null, // 0.6
          null, // 0.3
          null, // 0.15
          10, // 0.075
        ];
        result.nominalSize.restrictedZone.lower = await this.insertBlankPointsOnCurve(
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            39.1, // 2.36
            25.6, // 1.18
            19.1, // 0.6
            15.5, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          axisX,
        );
        result.nominalSize.restrictedZone.higher = await this.insertBlankPointsOnCurve(
          [
            null, // 38.1
            null, // 25.4
            null, // 19.1
            null, // 12.7
            null, // 9.5
            null, // 6.3
            null, // 4.8
            39.1, // 2.36
            31.6, // 1.18
            23.1, // 0.6
            15.5, // 0.3
            null, // 0.15
            null, // 0.075
          ],
          axisX,
        );
        result.nominalSize.curve = curve12;
      }

      for (let i = 0; i < percentsOfMaterials.length; i++) {
        for (let j = 0; j < 13; j++) {
          if (percentsOfMaterials[i][j] !== 100 && percentsOfMaterials[i][j] !== null) {
            for (let k = j - 1; k >= 0; k--) {
              if (percentsOfMaterials[i][k] === 100) {
                indexes.push(k);
                break;
              }
            }
            break;
          }
        }
      }

      result.percentsOfMaterialsToShow = listOfPercentsToReturn;
      result.percentsOfMaterials = percentsOfMaterials;

      if (dnitBand === 'A') {
        higherBand = [
          100, //sieve 1 1/2 pol - 38,1 mm
          100, //sieve 1 pol - 25,4 mm
          89, //sieve 3/4 pol - 19,1 mm
          78, //sieve 1/2 pol - 12,7 mm
          71, //sieve 3/8 pol - 9,5 mm
          61, //sieve 1/4 pol - 6,3 mm
          55, //sieve N° 4 - 4,8 mm
          45, //sieve N° 8 - 2,36 mm
          36, //sieve N° 16 - 1,18 mm
          28, //sieve N° 30 - 0,60 mm
          21, //sieve N° 50 - 0,30 mm
          14, //sieve N° 100 - 0,150 mm
          7, //sieve N° 200 - 0,075 mm
        ];
        lowerBand = [
          100, //sieve 1 1/2 pol - 38,1 mm
          90, //sieve 1 pol - 25,4 mm
          75, //sieve 3/4 pol - 19,1 mm
          58, //sieve 1/2 pol - 12,7 mm
          48, //sieve 3/8 pol - 9,5 mm
          35, //sieve 1/4 pol - 6,3 mm
          29, //sieve N° 4 - 4,8 mm
          19, //sieve N° 8 - 2,36 mm
          13, //sieve N° 16 - 1,18 mm
          9, //sieve N° 30 - 0,60 mm
          5, //sieve N° 50 - 0,30 mm
          2, //sieve N° 100 - 0,150 mm];
          1, //sieve N° 200 - 0,075 mm
        ];
      } else if (dnitBand === 'B') {
        higherBand = [
          null, //sieve 1 1/2 pol - 38,1 mm
          100, //sieve 1 pol - 25,4 mm
          100, //sieve 3/4 pol - 19,1 mm
          89, //sieve 1/2 pol - 12,7 mm
          82, //sieve 3/8 pol - 9,5 mm
          70, //sieve 1/4 pol - 6,3 mm
          63, //sieve N° 4 - 4,8 mm
          49, //sieve N° 8 - 2,36 mm
          37, //sieve N° 16 - 1,18 mm
          28, //sieve N° 30 - 0,60 mm
          20, //sieve N° 50 - 0,30 mm
          13, //sieve N° 100 - 0,150 mm
          8, //sieve N° 200 - 0,075 mm
        ];
        lowerBand = [
          null, //sieve 1 1/2 pol - 38,1 mm
          100, //sieve 1 pol - 25,4 mm
          90, //sieve 3/4 pol - 19,1 mm
          70, //sieve 1/2 pol - 12,7 mm
          55, //sieve 3/8 pol - 9,5 mm
          42, //sieve 1/4 pol - 6,3 mm
          35, //sieve N° 4 - 4,8 mm
          23, //sieve N° 8 - 2,36 mm
          16, //sieve N° 16 - 1,18 mm
          10, //sieve N° 30 - 0,60 mm
          6, //sieve N° 50 - 0,30 mm
          4, //sieve N° 100 - 0,150 mm
          2, //sieve N° 200 - 0,075 mm
        ];
      } else if (dnitBand === 'C') {
        higherBand = [
          null, //sieve 1 1/2 pol - 38,1 mm
          null, //sieve 1 pol - 25,4 mm
          100, //sieve 3/4 pol - 19,1 mm
          100, //sieve 1/2 pol - 12,7 mm
          89, //sieve 3/8 pol - 9,5 mm
          78, //sieve 1/4 pol - 6,3 mm
          72, //sieve N° 4 - 4,8 mm
          58, //sieve N° 8 - 2,36 mm
          45, //sieve N° 16 - 1,18 mm
          35, //sieve N° 30 - 0,60 mm
          25, //sieve N° 50 - 0,30 mm
          17, //sieve N° 100 - 0,150 mm
          10, //sieve N° 200 - 0,075 mm
        ];
        lowerBand = [
          null, //sieve 1 1/2 pol - 38,1 mm
          null, //sieve 1 pol - 25,4 mm
          100, //sieve 3/4 pol - 19,1 mm
          90, //sieve 1/2 pol - 12,7 mm
          73, //sieve 3/8 pol - 9,5 mm
          53, //sieve 1/4 pol - 6,3 mm
          44, //sieve N° 4 - 4,8 mm
          28, //sieve N° 8 - 2,36 mm
          17, //sieve N° 16 - 1,18 mm
          11, //sieve N° 30 - 0,60 mm
          6, //sieve N° 50 - 0,30 mm
          4, //sieve N° 100 - 0,150 mm
          2, //sieve N° 200 - 0,075 mm
        ];
      }

      const data = {
        nominalSize: result.nominalSize,
        // percentsToList: listOfPercentsToReturn,
        percentsToList: percentsOfMaterials,
        porcentagesPassantsN200,
        bands: {
          letter: dnitBand,
          higher: higherBand,
          lower: lowerBand,
        },
      };

     console.log('=== RESPONSE QUE SERÁ ENVIADO PARA FRONTEND ===');
console.log(JSON.stringify({
  data: {
    nominalSize: result.nominalSize,
    percentsToList: percentsOfMaterials,
    porcentagesPassantsN200,
    bands: {
      letter: dnitBand,
      higher: higherBand,
      lower: lowerBand,
    },
    aggregatesData: aggregates.map(agg => ({
      material: agg.material,
      data: agg.data, // ← ISSO ESTÁ SENDO INCLUÍDO?
      results: agg.results
    }))
  },
  success: true,
}, null, 2));
    } catch (error) {
      this.logger.error(`error on getting the step 3 data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async insertBlankPointsOnCurve(curve, axisX): Promise<any[]> {
    for (let k = 0; k < curve.length; k++) {
      if (curve[k] !== null) {
        for (let i = k; i < curve.length; i++) {
          if (curve[i] === null) {
            for (let j = i; j < curve.length; j++) {
              if (curve[j] !== null) {
                curve = this.findEquationOfCurve(curve, axisX, curve[i - 1], curve[j], axisX[i - 1], axisX[j], i);
                break;
              }
            }
          }
        }
      }
    }
    return curve;
  }

  async findEquationOfCurve(curve, axisX, y2, y1, x2, x1, i) {
    if (y1 !== y2) curve[i] = ((y2 - y1) / (x2 - x1)) * axisX[i] + (y1 * x2 - y2 * x1) / (x2 - x1);
    else curve[i] = y1;
    return curve;
  }

  async calculateGranulometricCompositionData(body: any) {
    try {
      const granulometry = await this.granulometryComposition_Service.calculateGranulometry(body);

      return { data: granulometry.data, success: true };
    } catch (error) {
      this.logger.error(`error on calculating granulometric composition data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async saveStep3Data(body: any, userId: string) {
    try {
      const success = await this.granulometryComposition_Service.saveGranulometryCompositionData(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 3 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getFirstCompressionSpecificMasses(body: any) {
    try {
      const data = await this.initialBinder_Service.getFirstCompressionSpecificMasses(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on get step 5 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveGranulometryCompositionData(body: any, userId: string) {
    try {
      const success = await this.granulometryComposition_Service.saveGranulometryCompositionData(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 4 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateStep5Data(body: any) {
    try {
      const data = await this.initialBinder_Service.calculateStep5Data(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on calculate step 5 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateGmm_RiceTest(body: any) {
    try {
      const gmm = await this.firstCompression_Service.calculateGmm_RiceTest(body);

      return { data: gmm, success: true };
    } catch (error) {
      this.logger.error(`error on getting the step 5 rice test data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async saveInitialBinderStep(body: any, userId: string) {
    try {
      const success = await this.initialBinder_Service.saveInitialBinderStep(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save initial binder data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveFirstCompressionData(body: any, userId: string) {
    try {
      const success = await this.firstCompression_Service.saveFirstCompressionData(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save first compression data on superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getFirstCompressionParametersData(body: any) {
    try {
      const data = await this.firstCompressionParams_Service.getFirstCompressionParametersData(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on get first compression parameters data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveFirstCompressionParamsData(body: any, userId: string) {
    try {
      const success = await this.firstCompressionParams_Service.saveFirstCompressionParamsData(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save percents of chosen curve data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async savePercentsOfChosenCurveData(body: any, userId: string) {
    try {
      const success = await this.chosenCurvePercentages_Service.savePercentsOfChosenCurveData(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save percents of chosen curve data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getChosenCurvePercentsData(body: any) {
    try {
      const data = await this.chosenCurvePercentages_Service.getChosenCurvePercentsData(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on get step 7 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateSecondCompressionRiceTest(body: any) {
    const { sampleAirDryMass, containerMassWaterSample, containerWaterMass, waterTemperatureCorrection } = body;
    try {
      const gmm = await this.secondCompression_Service.calculateSecondCompressionRiceTest(
        sampleAirDryMass,
        containerMassWaterSample,
        containerWaterMass,
        waterTemperatureCorrection,
      );

      return { data: gmm, success: true };
    } catch (error) {
      this.logger.error(`error on calculating rice test on second compression step > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async calculateStep7Gmm(gmmData: any) {
    try {
      const gmm = await this.secondCompression_Service.calculateStep7Gmm(gmmData);

      return { data: gmm, success: true };
    } catch (error) {
      this.logger.error(`error on getting the step 5 gmm data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async calculateSecondCompressionData(body: any) {
    try {
      const gmm = await this.secondCompression_Service.calculateSecondCompressionData(body);

      return { data: gmm, success: true };
    } catch (error) {
      this.logger.error(`error on calculating the second compression data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async saveSecondCompressionData(body: any, userId: string) {
    try {
      const success = await this.secondCompression_Service.saveSecondCompressionData(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save second compression data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getSecondCompressionPercentageData(body: any) {
    try {
      const data = await this.secondCompressionParameters_Service.getSecondCompressionPercentageData(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on get second compression percentage data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveSecondCompressionParams(body: any, userId: string) {
    try {
      const success = await this.secondCompressionParameters_Service.saveSecondCompressionParams(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 9 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveConfirmattionCompressionData(body: any, userId: string) {
    try {
      const success = await this.confirmCompaction_Service.saveConfirmattionCompressionData(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save confirm compaction step data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateStep9RiceTest(body: any) {
    try {
      const data = await this.resumeDosageEquation_Service.calculateStep9RiceTest(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on get step 9 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateDosageResumeEquation(body: any) {
    try {
      const data = await this.resumeDosageEquation_Service.calculateDosageResumeEquation(body);

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on calculating dosage equation superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveStep11Data(body: any, userId: string) {
    try {
      const success = await this.resumeDosageEquation_Service.saveStep11Data(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save step 11 data superpave > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveSuperpaveDosage(body: any, userId: string) {
    try {
      const success = await this.resumeDosageEquation_Service.saveSuperpaveDosage(body, userId);

      return { success };
    } catch (error) {
      this.logger.error(`error on save superpave dosage > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async deleteSuperpaveDosage(id: string) {
    try {
      const success = await this.generalData_Service.deleteSuperpaveDosage(id);

      return { success };
    } catch (error) {
      this.logger.error(`error on delete superpave dosage > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }
}
