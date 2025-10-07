import { Injectable, Logger } from '@nestjs/common';
import { AsphaltGranulometryRepository } from '../../../essays/granulometry/repository';
import { AsphaltGranulometry } from '../../../essays/granulometry/schemas';
import { AllSieves } from '../../../../../utils/interfaces';
import { Superpave, SuperpaveDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { SuperpaveRepository } from '../repository';
import { Model } from 'mongoose';

@Injectable()
export class GranulometryComposition_Superpave_Service {
  private logger = new Logger(GranulometryComposition_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpaveRepository: SuperpaveRepository,
    private readonly granulometry_repository: AsphaltGranulometryRepository,
  ) {}

  async getGranulometryData(aggregates: { _id: string; name: string }[]) {
    try {
      const granulometry_data: {
        _id: string;
        passants: {};
      }[] = [];

      const granulometrys = await this.granulometry_repository.findAll();

      // Percorre cada agregado e encontra a granulometria correspondente no banco de dados
      aggregates.forEach((aggregate) => {
        // Encontra a granulometria correspondente ao agregado
        const granulometry = granulometrys.find(({ generalData }) => 
          aggregate._id.toString() === generalData.material._id.toString()
        ) as AsphaltGranulometry;

        // Cria um objeto com as passantes para cada agregado
        const passants = Object.fromEntries(granulometry.results.passant);

        // Adiciona o objeto com as passantes ao array de dados
        granulometry_data.push({
          _id: aggregate._id,
          passants,
        });
      });

      //
      const table_column_headers: string[] = [];
      const table_rows = [];

      table_column_headers.push('sieve_label');

      AllSieves.forEach((sieve) => {
        const contains = granulometry_data.some((aggregate) => sieve.label in aggregate.passants);

        if (contains) {
          const aggregates_data = {};
          granulometry_data.forEach((aggregate) => {
            const { _id, passants } = aggregate;

            // aggregates_data[_id] = {}
            // aggregates_data[_id]['_id'] = _id
            aggregates_data['total_passant_'.concat(_id)] = passants[sieve.label];
            aggregates_data['passant_'.concat(_id)] = null;

            // adicionando as colunas à tabela
            if (!table_column_headers.some((header) => header.includes(_id))) {
              table_column_headers.push('total_passant_'.concat(_id));
              table_column_headers.push('passant_'.concat(_id));
            }
          });
          table_rows.push({ sieve_label: sieve.label, ...aggregates_data });
        }
      });

      this.logger.log(table_rows);
      this.logger.log(table_column_headers);

      const table_data = {
        table_column_headers,
        table_rows,
      };
      //

      return table_data;
    } catch (error) {
      throw error;
    }
  }

 async calculateGranulometry(body: any) {
  try {
    console.log('=== DEBUG CALCULATE GRANULOMETRY ===');
    console.log('Body recebido:', JSON.stringify(body, null, 2));

    let {
      chosenCurves,
      percentageInputs: percentsOfDosage,
      percentsToList,
      dnitBand,
      materials,
      nominalSize,
    } = body;

    // VALIDAÇÕES INICIAIS
    console.log('=== VALIDAÇÃO INICIAL DOS DADOS ===');
    console.log('chosenCurves:', chosenCurves);
    console.log('percentsOfDosage:', percentsOfDosage);
    console.log('percentsToList:', percentsToList);
    console.log('dnitBand:', dnitBand);
    console.log('materials:', materials);
    console.log('nominalSize:', nominalSize);

    // VALIDAÇÃO: Verificar arrays críticos
    if (!chosenCurves || !Array.isArray(chosenCurves)) {
      console.log('❌ chosenCurves é inválido, usando array vazio');
      chosenCurves = [];
    }

    if (!percentsOfDosage || !Array.isArray(percentsOfDosage)) {
      console.log('❌ percentsOfDosage é inválido, usando array vazio');
      percentsOfDosage = [[], [], []];
    }

     if (!percentsToList || percentsToList.length === 0) {
      console.log('❌ percentsToList está vazio, buscando dados...');
      percentsToList = await this.getPercentsToListData(materials, dnitBand);
      console.log('✅ percentsToList obtido:', percentsToList);
     }
    if (!materials || !Array.isArray(materials)) {
      console.log('❌ materials é inválido, usando array vazio');
      materials = [];
    }

    // VALIDAÇÃO CRÍTICA: Se nominalSize está incompleto
    if (!nominalSize || nominalSize.value === null || nominalSize.value === undefined || !nominalSize.curve) {
      console.log('❌ nominalSize incompleto, usando valores padrão...');
      
      // Usar valores padrão baseados na banda DNIT
      nominalSize = await this.getDefaultNominalSize(dnitBand);
      console.log('✅ nominalSize padrão obtido:', nominalSize);
    }

    // VALIDAÇÃO: Garantir que nominalSize tenha todas as propriedades necessárias
    if (!nominalSize.controlPoints) {
      console.log('❌ nominalSize.controlPoints é undefined, criando padrão');
      nominalSize.controlPoints = { lower: [], higher: [] };
    }

    if (!nominalSize.restrictedZone) {
      console.log('❌ nominalSize.restrictedZone é undefined, criando padrão');
      nominalSize.restrictedZone = { lower: [], higher: [] };
    }

    if (!nominalSize.curve || !Array.isArray(nominalSize.curve)) {
      console.log('❌ nominalSize.curve é inválido, criando array vazio');
      nominalSize.curve = [];
    }

    // ⬇️⬇️⬇️ CORREÇÃO: percentsOfDosage[0] é objeto, não array ⬇️⬇️⬇️
    console.log('Tipo de percentsOfDosage[0]:', typeof percentsOfDosage[0]);
    
    // Converter objetos em arrays se necessário
    let lowerPercentsArray = [];
    let averagePercentsArray = [];
    let higherPercentsArray = [];

    if (percentsOfDosage[0] && typeof percentsOfDosage[0] === 'object') {
      lowerPercentsArray = Object.values(percentsOfDosage[0]).map(val => Number(val) || 0);
      console.log('percentsOfDosage[0] convertido para array:', lowerPercentsArray);
    } else if (Array.isArray(percentsOfDosage[0])) {
      lowerPercentsArray = percentsOfDosage[0];
    }

    if (percentsOfDosage[1] && typeof percentsOfDosage[1] === 'object') {
      averagePercentsArray = Object.values(percentsOfDosage[1]).map(val => Number(val) || 0);
      console.log('percentsOfDosage[1] convertido para array:', averagePercentsArray);
    } else if (Array.isArray(percentsOfDosage[1])) {
      averagePercentsArray = percentsOfDosage[1];
    }

    if (percentsOfDosage[2] && typeof percentsOfDosage[2] === 'object') {
      higherPercentsArray = Object.values(percentsOfDosage[2]).map(val => Number(val) || 0);
      console.log('percentsOfDosage[2] convertido para array:', higherPercentsArray);
    } else if (Array.isArray(percentsOfDosage[2])) {
      higherPercentsArray = percentsOfDosage[2];
    }

    // INICIALIZAR VARIÁVEIS
    let pointsOfCurve = [];
    let band = { higher: [], lower: [] };
    let sumOfPercents = [[], [], []];

    let lowerComposition = {
      sumOfPercents: [],
      percentsOfMaterials: null,
    };

    let averageComposition = {
      sumOfPercents: [],
      percentsOfMaterials: null,
    };

    let higherComposition = {
      sumOfPercents: [],
      percentsOfMaterials: null,
    };

    // CONFIGURAR COMPOSIÇÃO GRANULOMÉTRICA
    const granulometryComposition = {
      lower: {
        percentsOfDosage: {
          value: chosenCurves.includes('lower') ? lowerPercentsArray : [],
          isEmpty: chosenCurves.includes('lower') && lowerPercentsArray.length > 0,
        },
      },
      average: {
        percentsOfDosage: {
          value: chosenCurves.includes('average') ? averagePercentsArray : [],
          isEmpty: chosenCurves.includes('average') && averagePercentsArray.length > 0,
        },
      },
      higher: {
        percentsOfDosage: {
          value: chosenCurves.includes('higher') ? higherPercentsArray : [],
          isEmpty: chosenCurves.includes('higher') && higherPercentsArray.length > 0,
        },
      },
    };

    console.log('Granulometry Composition:', granulometryComposition);

    // CONFIGURAR BANDAS DNIT
    const axisX = [38.1, 25.4, 19.1, 12.7, 9.5, 6.3, 4.8, 2.36, 1.18, 0.6, 0.3, 0.15, 0.075];

    const higherBandA = this.insertBlankPointsOnCurve([100, 100, 89, 78, 71, 61, 55, 45, 36, 28, 24, 14, 7], axisX);
    const lowerBandA = this.insertBlankPointsOnCurve([100, 90, 75, 58, 48, 35, 29, 19, 13, 9, 5, 2, 1], axisX);
    const higherBandB = this.insertBlankPointsOnCurve([null, 100, 100, 89, 82, 70, 63, 49, 37, 28, 20, 13, 8], axisX);
    const lowerBandB = this.insertBlankPointsOnCurve([null, 100, 90, 70, 55, 42, 35, 23, 16, 10, 6, 4, 2], axisX);
    const higherBandC = this.insertBlankPointsOnCurve(
      [null, null, null, 100, 100, 89, 83, 67, 52, 40, 29, 19, 10],
      axisX,
    );
    const lowerBandC = this.insertBlankPointsOnCurve([null, null, null, 100, 90, 65, 53, 32, 20, 13, 8, 4, 2], axisX);

    if (dnitBand === 'A') {
      band = { higher: higherBandA, lower: lowerBandA };
    } else if (dnitBand === 'B') {
      band = { higher: higherBandB, lower: lowerBandB };
    } else if (dnitBand === 'C') {
      band = { higher: higherBandC, lower: lowerBandC };
    } else {
      console.log('❌ dnitBand inválido:', dnitBand);
      band = { higher: [], lower: [] };
    }

    // CALCULAR COMPOSIÇÕES
      if (granulometryComposition.lower.percentsOfDosage.isEmpty && lowerPercentsArray.length > 0) {
      console.log('Calculando composição lower...');
      lowerComposition = this.calculatePercentOfMaterials(materials, lowerPercentsArray, percentsToList);
      sumOfPercents[0] = lowerComposition.sumOfPercents?.map((e) => e) || [];
      console.log('Composição lower calculada:', lowerComposition);
    } else {
      console.log('❌ Não há percentuais válidos para composição lower');
      sumOfPercents[0] = [];
    }

    if (granulometryComposition.average.percentsOfDosage.isEmpty && averagePercentsArray.length > 0) {
      console.log('Calculando composição average...');
      averageComposition = this.calculatePercentOfMaterials(materials, averagePercentsArray, percentsToList);
      sumOfPercents[1] = averageComposition.sumOfPercents?.map((e) => e) || [];
      console.log('Composição average calculada:', averageComposition);
    } else {
      console.log('❌ Não há percentuais válidos para composição average');
      sumOfPercents[1] = [];
    }

    if (granulometryComposition.higher.percentsOfDosage.isEmpty && higherPercentsArray.length > 0) {
      console.log('Calculando composição higher...');
      higherComposition = this.calculatePercentOfMaterials(materials, higherPercentsArray, percentsToList);
      sumOfPercents[2] = higherComposition.sumOfPercents?.map((e) => e) || [];
      console.log('Composição higher calculada:', higherComposition);
    } else {
      console.log('❌ Não há percentuais válidos para composição higher');
      sumOfPercents[2] = [];
    }

    // PROCESSAR CURVAS
    console.log('Processando pontos da curva...');
    
    if (granulometryComposition.lower.percentsOfDosage.isEmpty) {
      sumOfPercents[0] = this.insertBlankPointsOnCurve(sumOfPercents[0], axisX);
    } else {
      sumOfPercents[0] = Array(13).fill(null);
    }

    if (granulometryComposition.average.percentsOfDosage.isEmpty) {
      sumOfPercents[1] = this.insertBlankPointsOnCurve(sumOfPercents[1], axisX);
    } else {
      sumOfPercents[1] = Array(13).fill(null);
    }

    if (granulometryComposition.higher.percentsOfDosage.isEmpty) {
      sumOfPercents[2] = this.insertBlankPointsOnCurve(sumOfPercents[2], axisX);
    } else {
      sumOfPercents[2] = Array(13).fill(null);
    }

    // CRIAR PONTOS DA CURVA
    for (let i = 0; i < nominalSize.curve.length; i++) {
      const point = [
        axisX[i] && nominalSize.value ? Math.pow(axisX[i] / nominalSize.value, 0.45) : null,
        nominalSize.controlPoints.lower?.[i] || null,
        nominalSize.controlPoints.higher?.[i] || null,
        nominalSize.restrictedZone.lower?.[i] || null,
        nominalSize.restrictedZone.higher?.[i] || null,
        nominalSize.curve[i] || null,
        band.higher[i] || null,
        band.lower[i] || null,
      ];

      // Adicionar composições se disponíveis
      if (granulometryComposition.lower.percentsOfDosage.isEmpty) {
        point.push(sumOfPercents[0][i] || null);
      }
      if (granulometryComposition.average.percentsOfDosage.isEmpty) {
        point.push(sumOfPercents[1][i] || null);
      }
      if (granulometryComposition.higher.percentsOfDosage.isEmpty) {
        point.push(sumOfPercents[2][i] || null);
      }

      pointsOfCurve.push(point);
    }

    console.log('=== DADOS PROCESSADOS COM SUCESSO ===');
    console.log('Points of curve:', pointsOfCurve);

    const data = {
      lowerComposition,
      averageComposition,
      higherComposition,
      pointsOfCurve,
      nominalSize,
      chosenCurves,
    };

    return { data, success: true };
  } catch (error) {
    console.error('❌ ERRO NO CALCULATE GRANULOMETRY:', error);
    throw error;
  }
}
async getPercentsToListData(materials: any[], dnitBand: string): Promise<any[]> {
  try {
    console.log('=== OBTENDO PERCENTS TO LIST ===');
    
    // ❌ NÃO GERAR FALLBACK - LANÇAR ERRO EXPLICATIVO!
    throw new Error(
      'Dados de análise granulométrica não fornecidos. ' +
      'O frontend deve enviar percentsToList com as curvas granulométricas reais dos materiais. ' +
      'Sem esses dados, o cálculo não pode ser realizado.'
    );

  } catch (error) {
    console.error('❌ Erro crítico - dados granulométricos não fornecidos:', error);
    throw error; // ⬅️ PROPAGA O ERRO PARA O FRONTEND SABER!
  }
}

async getDefaultNominalSize(dnitBand: string): Promise<any> {
  console.log('Obtendo nominalSize padrão para banda:', dnitBand);
  
  // Valores padrão baseados na banda DNIT
  const defaultSizes = {
    'A': {
      value: 38.1,
      controlPoints: {
        lower: [100, 90, null, null, null, null, null, 19, null, null, null, null, 1],
        higher: [100, 100, 90, null, null, null, null, 45, null, null, null, null, 7],
      },
      restrictedZone: {
        lower: [null, null, null, null, null, null, 39.5, 26.8, 18.1, 13.6, 11.4, null, null],
        higher: [null, null, null, null, null, null, 39.5, 30.8, 24.1, 17.6, 13.7, null, null],
      },
      curve: [100, 100, null, null, null, null, null, null, null, null, null, null, null],
    },
    'B': {
      value: 19.1,
      controlPoints: {
        lower: [null, 100, 90, null, null, null, null, 23, null, null, null, null, 2],
        higher: [null, null, 100, 90, null, null, null, 49, null, null, null, null, 8],
      },
      restrictedZone: {
        lower: [null, null, null, null, null, null, null, 34.6, 22.3, 16.7, 13.7, null, null],
        higher: [null, null, null, null, null, null, null, 34.6, 28.3, 20.7, 13.7, null, null],
      },
      curve: [null, 100, 100, null, null, null, null, null, null, null, null, null, null],
    },
    'C': {
      value: 12.7,
      controlPoints: {
        lower: [null, null, 100, 90, null, null, null, 28, null, null, null, null, 2],
        higher: [null, null, null, 100, 90, null, null, 58, null, null, null, null, 10],
      },
      restrictedZone: {
        lower: [null, null, null, null, null, null, null, 39.1, 25.6, 19.1, 15.5, null, null],
        higher: [null, null, null, null, null, null, null, 39.1, 31.6, 23.1, 15.5, null, null],
      },
      curve: [null, null, 100, 100, null, null, null, null, null, null, null, null, null],
    }
  };

  return defaultSizes[dnitBand] || defaultSizes['B']; // Fallback para banda B
}

async getCompleteNominalSizeData(dnitBand: string, materials: any[]): Promise<any> {
  try {
    console.log('=== OBTENDO NOMINAL SIZE COMPLETO ===');
    
    // Aqui você precisa chamar o método que calcula o nominalSize completo
    // Baseado no seu código anterior, parece que isso vem do getGranulometricCompositionData
    const nominalSizeData = {
      value: 19.1, // Exemplo - você precisa calcular isso baseado nos materiais
      controlPoints: {
        lower: [null, 100, 90, null, null, null, null, 23, null, null, null, null, 2],
        higher: [null, null, 100, 90, null, null, null, 49, null, null, null, null, 8],
      },
      restrictedZone: {
        lower: [null, null, null, null, null, null, null, 34.6, 22.3, 16.7, 13.7, null, null],
        higher: [null, null, null, null, null, null, null, 34.6, 28.3, 20.7, 13.7, null, null],
      },
      curve: [null, 100, 100, null, null, null, null, null, null, null, null, null, null],
    };

    // Se for banda B (como nos seus dados)
    if (dnitBand === 'B') {
      nominalSizeData.value = 19.1;
      nominalSizeData.controlPoints = {
        lower: [null, 100, 90, null, null, null, null, 23, null, null, null, null, 2],
        higher: [null, null, 100, 90, null, null, null, 49, null, null, null, null, 8],
      };
      nominalSizeData.restrictedZone = {
        lower: [null, null, null, null, null, null, null, 34.6, 22.3, 16.7, 13.7, null, null],
        higher: [null, null, null, null, null, null, null, 34.6, 28.3, 20.7, 13.7, null, null],
      };
      nominalSizeData.curve = [null, 100, 100, null, null, null, null, null, null, null, null, null, null];
    }

    return nominalSizeData;
  } catch (error) {
    console.error('❌ Erro ao obter nominalSize completo:', error);
    return null;
  }
}
  insertBlankPointsOnCurve(curve, axisX) {
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

  findEquationOfCurve(curve, axisX, y2, y1, x2, x1, i) {
    if (y1 !== y2) curve[i] = ((y2 - y1) / (x2 - x1)) * axisX[i] + (y1 * x2 - y2 * x1) / (x2 - x1);
    else curve[i] = y1;
    return curve;
  }

 calculatePercentOfMaterials(materials, percentsOfDosage, percentsToList) {
  console.log('=== DEBUG calculatePercentOfMaterials ===');
  console.log('materials:', materials);
  console.log('percentsOfDosage:', percentsOfDosage);
  console.log('percentsToList:', percentsToList);
  console.log('percentsToList length:', percentsToList?.length);

  // ⬇️⬇️⬇️ VALIDAÇÕES INICIAIS ⬇️⬇️⬇️
  if (!materials || !Array.isArray(materials)) {
    console.log('❌ materials é inválido, usando array vazio');
    materials = [];
  }

  if (!percentsOfDosage || !Array.isArray(percentsOfDosage)) {
    console.log('❌ percentsOfDosage é inválido, usando array vazio');
    percentsOfDosage = [];
  }

  if (!percentsToList || !Array.isArray(percentsToList)) {
    console.log('❌ percentsToList é inválido, usando array vazio');
    percentsToList = [];
  }

  // ⬇️⬇️⬇️ CORREÇÃO: Se percentsToList estiver vazio, criar estrutura básica ⬇️⬇️⬇️
  if (percentsToList.length === 0) {
    console.log('⚠️ percentsToList está vazio, criando estrutura básica...');
    // Criar estrutura com 13 peneiras (padrão Superpave)
    percentsToList = materials.map(() => 
      Array(13).fill(null).map((_, index) => [`Peneira ${index + 1}`, 0])
    );
    console.log('✅ Estrutura básica criada:', percentsToList);
  }

  let percentsOfMaterialsToShow = [];
  let newPercentsOfDosage = [];
  
  // ⬇️⬇️⬇️ CORREÇÃO: Filtrar materiais com validação ⬇️⬇️⬇️
  let materialsWithoutBinder = materials.filter(
    (material) => material && material.type !== 'asphaltBinder' && material.type !== 'CAP' && material.type !== 'other',
  );

  console.log('materialsWithoutBinder:', materialsWithoutBinder);

  // ⬇️⬇️⬇️ INICIALIZAR ARRAYS COM VALIDAÇÃO ⬇️⬇️⬇️
  for (let i = 0; i < percentsToList.length; i++) {
    percentsOfMaterialsToShow.push([]);
  }

  console.log('Processando percentsToList...');
  
  // ⬇️⬇️⬇️ CORREÇÃO: Processar percentsToList com validações ⬇️⬇️⬇️
  percentsToList.forEach((arr, idx) => {
    // VALIDAÇÃO: Verificar se arr existe e é array
    if (!arr || !Array.isArray(arr)) {
      console.log(`❌ percentsToList[${idx}] é inválido, pulando`);
      return;
    }

    arr.forEach((subArr, i) => {
      // VALIDAÇÃO: Garantir que o array interno existe
      if (!percentsOfMaterialsToShow[idx]) {
        percentsOfMaterialsToShow[idx] = [];
      }

      if (Array.isArray(subArr) && subArr.length > 1) {
        percentsOfMaterialsToShow[idx][i] = subArr[1];
      } else {
        percentsOfMaterialsToShow[idx][i] = subArr;
      }
    });
  });

  console.log('percentsOfMaterialsToShow:', percentsOfMaterialsToShow);

  // ⬇️⬇️⬇️ CORREÇÃO: Converter percentsOfDosage com validação ⬇️⬇️⬇️
  if (Array.isArray(percentsOfDosage)) {
    newPercentsOfDosage = [...percentsOfDosage];
  } else if (typeof percentsOfDosage === 'object') {
    newPercentsOfDosage = Object.values(percentsOfDosage).map(val => Number(val) || 0);
  } else {
    newPercentsOfDosage = [];
  }

  console.log('newPercentsOfDosage:', newPercentsOfDosage);

  // ⬇️⬇️⬇️ CORREÇÃO: Inicializar sumOfPercents com tamanho correto ⬇️⬇️⬇️
  const numPeneiras = percentsOfMaterialsToShow[0]?.length || 13;
  let sumOfPercents = Array(numPeneiras).fill(0); // Iniciar com 0, não null

  console.log('Número de peneiras:', numPeneiras);
  console.log('sumOfPercents inicial:', sumOfPercents);

  let percentsOfMaterials = [];

  // ⬇️⬇️⬇️ CORREÇÃO: Cálculo principal com validações ⬇️⬇️⬇️
  for (let i = 0; i < materialsWithoutBinder.length; i++) {
    // VALIDAÇÃO: Verificar se temos dados para este material
    if (!percentsOfMaterialsToShow[i] || !Array.isArray(percentsOfMaterialsToShow[i])) {
      console.log(`❌ percentsOfMaterialsToShow[${i}] é inválido, pulando material`);
      percentsOfMaterials.push(Array(numPeneiras).fill(0));
      continue;
    }

    // VALIDAÇÃO: Verificar se temos percentual de dosagem para este material
    const percentDosage = newPercentsOfDosage[i] || 0;
    
    percentsOfMaterials.push([]);
    
    for (let j = 0; j < numPeneiras; j++) {
      // VALIDAÇÃO: Verificar se o valor existe
      const materialValue = percentsOfMaterialsToShow[i][j];
      
      if (materialValue !== null && materialValue !== undefined && !isNaN(materialValue)) {
        const calculatedValue = (materialValue * percentDosage) / 100;
        percentsOfMaterials[i][j] = calculatedValue;
        
        // VALIDAÇÃO: Verificar índice antes de somar
        if (j < sumOfPercents.length) {
          sumOfPercents[j] += calculatedValue;
        }
      } else {
        percentsOfMaterials[i][j] = 0;
      }
    }
  }

  console.log('✅ Cálculo concluído:');
  console.log('sumOfPercents:', sumOfPercents);
  console.log('percentsOfMaterials:', percentsOfMaterials);

  return { 
    sumOfPercents, 
    percentsOfMaterials 
  };
}

 async saveGranulometryCompositionData(body: any, userId: string) {
  try {
    this.logger.log(
      'save superpave granulometry composition step on granulometry-composition.superpave.service.ts > [body]',
      { body },
    );

    const { name } = body.granulometryCompositionData;

    const superpaveExists: any = await this.superpaveRepository.findOne(name, userId);

    // ⬇️⬇️⬇️ MANTENHA OS TABLE_DATA ⬇️⬇️⬇️
    const { name: materialName, ...granulometryCompositionWithoutName } = body.granulometryCompositionData;

    // ⬇️⬇️⬇️ CORREÇÃO: Garantir que os table_data sejam preservados ⬇️⬇️⬇️
    const granulometryCompositionWithTableData = {
      ...granulometryCompositionWithoutName,
      // Garantir que cada granulometry mantenha seus table_data
      granulometrys: granulometryCompositionWithoutName.granulometrys?.map(gran => ({
        material: gran.material,
        data: gran.data, // ⬅️ ISSO É CRÍTICO - PRESERVAR OS DADOS BRUTOS
        result: gran.result // ⬅️ Resultado do processamento (pode ser null)
      })) || []
    };

    const superpaveWithGranulometryComposition = {
      ...superpaveExists._doc,
      granulometryCompositionData: granulometryCompositionWithTableData, // ⬅️ USAR A VERSÃO CORRIGIDA
    };

    await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithGranulometryComposition);

    if (superpaveExists._doc.generalData.step < 4) {
      await this.superpaveRepository.saveStep(superpaveExists, 4);
    }

    return true;
  } catch (error) {
    throw error;
  }
}
  async saveStep5Data(body: any, userId: string) {
    try {
      this.logger.log('save superpave initial binder step on granulometry-composition.superpave.service.ts > [body]', {
        body,
      });

      const { name } = body.initialBinderData;

      const superpaveExists: any = await this.superpaveRepository.findOne(name, userId);

      const { name: materialName, ...initialBinderWithoutName } = body.initialBinderData;

      const superpaveWithInitialBinder = { ...superpaveExists._doc, initialBinderData: initialBinderWithoutName };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithInitialBinder);

      if (superpaveExists._doc.generalData.step < 5) {
        await this.superpaveRepository.saveStep(superpaveExists, 5);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
