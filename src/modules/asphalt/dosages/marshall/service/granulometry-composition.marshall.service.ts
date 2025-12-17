import { Injectable, Logger } from '@nestjs/common';
import { AsphaltGranulometryRepository } from '../../../essays/granulometry/repository';
import { AllSieves } from '../../../../../utils/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Marshall, MarshallDocument } from '../schemas';
import { MarshallRepository } from '../repository';

@Injectable()
export class GranulometryComposition_Marshall_Service {
  private logger = new Logger(GranulometryComposition_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>,
    private readonly granulometry_repository: AsphaltGranulometryRepository,
    private readonly marshallRepository: MarshallRepository,
  ) {}

async getGranulometryData(aggregates: { _id: string; name: string }[]) {
  try {
    console.log('🔍 === INÍCIO getGranulometryData ===');
    console.log('Aggregates recebidos:', JSON.stringify(aggregates, null, 2));
    
    if (!aggregates || !Array.isArray(aggregates) || aggregates.length === 0) {
      return { table_column_headers: ['sieve_label'], table_rows: [] };
    }
    
    const granulometry_data: {
      _id: string;
      passants: {};
    }[] = [];

    const granulometrys = await this.granulometry_repository.findAll();
    
    console.log('📊 Total de ensaios:', granulometrys.length);

    aggregates.forEach((aggregate) => {
      console.log(`\n🔍 Processando aggregate: ${aggregate.name} (${aggregate._id})`);
      
      const granulometry: any = granulometrys.find(({ generalData }) => {
        if (!generalData || !generalData.material) return false;
        return generalData.material._id.toString() === aggregate._id.toString();
      });

      if (!granulometry) {
        console.log('  ❌ Nenhum ensaio encontrado');
        granulometry_data.push({
          _id: aggregate._id,
          passants: {},
        });
        return;
      }

      console.log('  ✅ Ensaio encontrado! ID:', granulometry._id);
      
      // 🔴🔴🔴🔴🔴 INVESTIGAÇÃO COMPLETA DA ESTRUTURA 🔴🔴🔴🔴🔴
      console.log('  🔎 Investigando estrutura do ensaio:');
      
      // PRIMEIRO: VERIFICA SE TEM table_data NO step2Data (QUE É ONDE TÁ)
      if (granulometry.step2Data) {
        console.log('    - Tem step2Data? SIM');
        console.log('    - Keys do step2Data:', Object.keys(granulometry.step2Data));
        
        // SE TEM table_data, VAI LÁ PEGAR
        if (granulometry.step2Data.table_data) {
          console.log('    - Tem table_data? SIM');
          console.log('    - Keys do table_data:', Object.keys(granulometry.step2Data.table_data));
          
          // TENTA PEGAR DADOS DA table_data.rows
          if (granulometry.step2Data.table_data.rows && Array.isArray(granulometry.step2Data.table_data.rows)) {
            console.log('    - Tem rows no table_data? SIM');
            console.log('    - Quantidade de rows:', granulometry.step2Data.table_data.rows.length);
            
            if (granulometry.step2Data.table_data.rows.length > 0) {
              console.log('    - Primeira row:', JSON.stringify(granulometry.step2Data.table_data.rows[0], null, 2));
            }
            
            // 🔴🔴🔴 AQUI É ONDE OS DADOS ESTÃO! 🔴🔴🔴
            const rows = granulometry.step2Data.table_data.rows;
            const passants = {};
            
            rows.forEach((row, index) => {
              console.log(`    Row ${index}:`, row);
              
              if (row && row.sieve_label) {
                // TENTA PEGAR accumulated_passant OU passant
                const value = row.accumulated_passant !== undefined ? row.accumulated_passant : 
                             row.passant !== undefined ? row.passant : 
                             null;
                
                if (value !== null) {
                  passants[row.sieve_label] = value;
                  console.log(`      ✅ Peneira: ${row.sieve_label} = ${value}`);
                } else {
                  console.log(`      ⚠️ Peneira ${row.sieve_label} sem valor de passant`);
                }
              }
            });
            
            console.log('    Passants extraídos:', Object.keys(passants).length, 'peneiras');
            
            granulometry_data.push({
              _id: aggregate._id,
              passants: passants,
            });
            return; // JÁ PROCESSOU, VAI PRO PRÓXIMO
          }
        }
      }
      
      console.log('    - Tem data?', !!granulometry.data);
      console.log('    - Tem results?', !!granulometry.results);
      console.log('    - Tem passant direto?', !!granulometry.passant);
      
      // SE NÃO ACHOU NO table_data, TENTA OS OUTROS LUGARES
      let passantData = null;
      
      // Opção 1: Diretamente no ensaio
      if (granulometry.passant && Array.isArray(granulometry.passant)) {
        console.log('  📌 Passant encontrado em granulometry.passant');
        passantData = granulometry.passant;
      }
      // Opção 2: Em step2Data.passant (se existir)
      else if (granulometry.step2Data?.passant && Array.isArray(granulometry.step2Data.passant)) {
        console.log('  📌 Passant encontrado em granulometry.step2Data.passant');
        passantData = granulometry.step2Data.passant;
      }
      // Opção 3: Em step2Data.data
      else if (granulometry.step2Data?.data?.passant && Array.isArray(granulometry.step2Data.data.passant)) {
        console.log('  📌 Passant encontrado em granulometry.step2Data.data.passant');
        passantData = granulometry.step2Data.data.passant;
      }
      // Opção 4: Em results
      else if (granulometry.results?.passant && Array.isArray(granulometry.results.passant)) {
        console.log('  📌 Passant encontrado em granulometry.results.passant');
        passantData = granulometry.results.passant;
      }
      // Opção 5: Em data
      else if (granulometry.data?.passant && Array.isArray(granulometry.data.passant)) {
        console.log('  📌 Passant encontrado em granulometry.data.passant');
        passantData = granulometry.data.passant;
      }
      // Opção 6: VERIFICA SE TEM table_data DIRETO (não dentro de step2Data)
      else if (granulometry.table_data?.rows && Array.isArray(granulometry.table_data.rows)) {
        console.log('  📌 Dados encontrados em granulometry.table_data.rows');
        const rows = granulometry.table_data.rows;
        const passants = {};
        
        rows.forEach(row => {
          if (row && row.sieve_label) {
            const value = row.accumulated_passant !== undefined ? row.accumulated_passant : 
                         row.passant !== undefined ? row.passant : 
                         null;
            
            if (value !== null) {
              passants[row.sieve_label] = value;
            }
          }
        });
        
        granulometry_data.push({
          _id: aggregate._id,
          passants: passants,
        });
        return;
      }
      
      // SE NÃO ACHOU PASSANT EM LUGAR NENHUM
      if (!passantData) {
        console.log('  ❌ Nenhum dado de passant encontrado em nenhum lugar!');
        
        // MOSTRA MAIS DA ESTRUTURA PRA DEBUG
        console.log('  📋 Estrutura completa do ensaio:');
        const keys = Object.keys(granulometry);
        console.log('  Keys principais:', keys);
        
        // MOSTRA O QUE TEM DENTRO DE CADA KEY IMPORTANTE
        ['step2Data', 'data', 'results', 'table_data'].forEach(key => {
          if (granulometry[key]) {
            console.log(`  Conteúdo de ${key}:`, Object.keys(granulometry[key]));
          }
        });
        
        granulometry_data.push({
          _id: aggregate._id,
          passants: {},
        });
        return;
      }

      // 🔴🔴🔴 SE CHEGOU AQUI, TEM PASSANTDATA DE ALGUM LUGAR 🔴🔴🔴
      console.log('    Passant encontrado:', passantData.length, 'itens');
      
      console.log('    🔎 Estrutura do primeiro item do passant:');
      if (passantData.length > 0) {
        console.log('      Primeiro item:', passantData[0]);
        console.log('      Tipo:', typeof passantData[0]);
        console.log('      É array?', Array.isArray(passantData[0]));
        if (typeof passantData[0] === 'object') {
          console.log('      Keys do primeiro item:', Object.keys(passantData[0]));
        }
      }
      
      let passants = {};
      
      // 🔴🔴🔴 PROCESSAMENTO DO PASSANTDATA 🔴🔴🔴
      passantData.forEach((p, index) => {
        console.log(`    Item ${index}:`, p);
        
        if (p) {
          let sieveLabel = null;
          let passantValue = null;
          
          // Possibilidade 1: p.sieve_label e p.passant
          if (p.sieve_label !== undefined && p.passant !== undefined) {
            sieveLabel = p.sieve_label;
            passantValue = p.passant;
          }
          // Possibilidade 2: p.label e p.value
          else if (p.label !== undefined && p.value !== undefined) {
            sieveLabel = p.label;
            passantValue = p.value;
          }
          // Possibilidade 3: p[0] e p[1] (array)
          else if (Array.isArray(p) && p.length >= 2) {
            sieveLabel = p[0];
            passantValue = p[1];
          }
          // Possibilidade 4: accumulated_passant
          else if (p.sieve_label !== undefined && p.accumulated_passant !== undefined) {
            sieveLabel = p.sieve_label;
            passantValue = p.accumulated_passant;
          }
          // Possibilidade 5: propriedades diferentes
          else {
            if (typeof p === 'object') {
              console.log('      Keys:', Object.keys(p));
              // TENTA QUALQUER COISA QUE PARECE SER UM VALOR NUMÉRICO
              for (const key in p) {
                if (typeof p[key] === 'number' && (key.includes('passant') || key.includes('value'))) {
                  sieveLabel = key;
                  passantValue = p[key];
                  break;
                }
              }
            }
          }
          
          if (sieveLabel !== null && passantValue !== null) {
            passants[sieveLabel] = passantValue;
            console.log(`      ✅ Adicionado: ${sieveLabel} = ${passantValue}`);
          }
        }
      });
      
      console.log('    Passants extraídos:', Object.keys(passants).length, 'peneiras');
      if (Object.keys(passants).length > 0) {
        console.log('    Peneiras:', Object.keys(passants));
      }
      
      granulometry_data.push({
        _id: aggregate._id,
        passants: passants,
      });
    });

    console.log('\n📊 RESUMO DOS DADOS COLETADOS:');
    granulometry_data.forEach((data, index) => {
      const hasData = Object.keys(data.passants).length > 0;
      console.log(`  Aggregate ${index + 1}: ${data._id} - ${hasData ? 'COM dados' : 'SEM dados'}`);
      if (hasData) {
        console.log(`    Peneiras: ${Object.keys(data.passants).join(', ')}`);
      }
    });

    // 🔴🔴🔴🔴🔴 CRIAÇÃO DA TABELA 🔴🔴🔴🔴🔴
    const table_column_headers: string[] = [];
    const table_rows = [];

    table_column_headers.push('sieve_label');

    AllSieves.forEach((sieve) => {
      const contains = granulometry_data.some((aggregate) => sieve.label in aggregate.passants);

      if (contains) {
        const aggregates_data = {};
        granulometry_data.forEach((aggregate) => {
          const { _id, passants } = aggregate;

          aggregates_data['total_passant_'.concat(_id)] = passants[sieve.label] || null;
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

    console.log('\n📋 TABELA GERADA:');
    console.log('  Table rows:', table_rows.length);
    console.log('  Table columns:', table_column_headers.length);
    console.log('  Columns:', table_column_headers);
    
    if (table_rows.length === 0) {
      console.log('❌ TABELA VAZIA! Possíveis causas:');
      console.log('  1. Nenhum dado de passant encontrado');
      console.log('  2. As peneiras em AllSieves não batem com as dos dados');
      console.log('  3. sieve_labels diferentes');
      
      // Mostra quais sieve_labels existem nos dados
      const allSieveLabels = new Set<string>();
      granulometry_data.forEach(agg => {
        Object.keys(agg.passants).forEach(label => {
          allSieveLabels.add(label);
        });
      });
      
      console.log('  Sieve_labels encontrados nos dados:', Array.from(allSieveLabels));
      console.log('  Primeiras 5 peneiras de AllSieves:', AllSieves.slice(0, 5).map(s => s.label));
    }

    const table_data = {
      table_column_headers,
      table_rows,
    };

    console.log('✅ === FIM getGranulometryData ===');
    
    return table_data;
  } catch (error) {
    console.error('💥 Error in getGranulometryData:', error);
    throw error;
  }
}

  async calculateGranulometry(body: any) {
    try {
      const { dnitBands, percentageInputs, tableRows } = body;

      //Materiais
      let percentsOfDosage = [];

      const ids1 = new Set();

      Object.keys(percentageInputs[0]).forEach((key) => {
        const id = key.split('_')[1];
        ids1.add(id);
        const value = percentageInputs[0][key];
        const index = Array.from(ids1).indexOf(id);
        percentsOfDosage[index] = { [id]: value };
      });

      const ids2 = new Set();

      let percentsOfMaterials = [];

      for (let i = 0; i < percentsOfDosage.length; i++) {
        let obj = percentsOfDosage[i];
        let key = Object.keys(obj)[0];
        percentsOfMaterials.push(Array(20).fill({ [key]: null }));
      }

      // let percentsOfMaterials = [Array(20).fill(null), Array(20).fill(null)];

      let newTableRows = tableRows;

      tableRows.forEach((element) => {
        Object.keys(element).forEach((key) => {
          if (key === 'sieve_label') {
            const sieveLabel = element[key];
            Object.keys(element).forEach((key2) => {
              const stringIdx = key2.lastIndexOf('_');
              if (stringIdx !== -1) {
                const firstString = key2.substring(0, stringIdx);
                if (firstString === 'total_passant') {
                  const id = key2.substring(stringIdx + 1);

                  ids2.add(id);
                  const value = element[key2];
                  const internIndex = Array.from(ids2).indexOf(id);
                  const sieveIndex = AllSieves.findIndex((sieve) => sieve.label === sieveLabel);
                  if (sieveIndex !== -1) {
                    percentsOfMaterials[internIndex][sieveIndex] = { [id]: value };
                  }
                }
              }
            });
          }
        });
      });

      const axisX = [
        76, 64, 50, 38, 32, 25, 19, 12.5, 9.5, 6.3, 4.8, 2.4, 2, 1.2, 0.85, 0.6, 0.43, 0.3, 0.25, 0.18, 0.15, 0.106,
        0.075,
      ];
      let higherBandA = this.insertBlankPointsOnCurve(
        [null, null, 100, 100, null, 100, 90, null, 65, null, 50, null, 40, null, null, 30, null, 20, null, 8],
        axisX,
      );
      let lowerBandA = this.insertBlankPointsOnCurve(
        [null, null, 100, 95, null, 75, 60, null, 35, null, 25, null, 20, null, null, 10, null, 5, null, 1],
        axisX,
      );
      let higherBandB = this.insertBlankPointsOnCurve(
        [null, null, null, 100, null, 100, 100, null, 80, null, 60, null, 45, null, null, 32, null, 20, null, 8],
        axisX,
      );
      let lowerBandB = this.insertBlankPointsOnCurve(
        [null, null, null, 100, null, 95, 80, null, 45, null, 28, null, 20, null, null, 10, null, 8, null, 3],
        axisX,
      );
      let higherBandC = this.insertBlankPointsOnCurve(
        [null, null, null, null, null, null, 100, 100, 90, null, 72, null, 50, null, null, 26, null, 16, null, 10],
        axisX,
      );
      let lowerBandC = this.insertBlankPointsOnCurve(
        [null, null, null, null, null, null, 100, 80, 70, null, 44, null, 22, null, null, 8, null, 4, null, 2],
        axisX,
      );

      let band = { higher: [], lower: [] };

      if (dnitBands === 'A') band = { higher: higherBandA, lower: lowerBandA };
      else if (dnitBands === 'B') band = { higher: higherBandB, lower: lowerBandB };
      else if (dnitBands === 'C') band = { higher: higherBandC, lower: lowerBandC };
      let sumOfPercents = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];

      for (let i = 0; i < percentsOfMaterials.length; i++) {
        for (let j = 0; j < 20; j++) {
          let materialValue = Object.values(percentsOfMaterials[i][j])[0] as number;
          let materialKey = Object.keys(percentsOfMaterials[i][j])[0];

          if (materialValue !== null) {
            let dosageObject = percentsOfDosage.find((e) => e.hasOwnProperty(materialKey));
            let dosageValue = null;

            // Verifica se o objeto foi encontrado e, se sim, obtém o valor
            if (dosageObject) {
              dosageValue = dosageObject[materialKey];
            }

            if (materialValue !== null) {
              let value = (materialValue * dosageValue) / 100;
              percentsOfMaterials[i][j] = { [materialKey]: value };
              sumOfPercents[j] += percentsOfMaterials[i][j][materialKey];
            }
          } else percentsOfMaterials[i][j] = null;
        }
      }

      tableRows.forEach((element) => {
        Object.keys(element).forEach((keys) => {
          const stringIndex = keys.indexOf('_');
          const label = keys.substring(0, stringIndex);
          const id = keys.substring(stringIndex + 1);

          // Remove null values from the percentsOfMaterials array
          const newArray = percentsOfMaterials.map((innerArray) =>
            innerArray.filter((value) => value !== null)
          );

          const index = tableRows.indexOf(element);

          if (label === 'passant') {
            // Find the key in the current element that matches the pattern 'passant_${id}'
            const key = Object.keys(tableRows[index]).find((k) => k === `passant_${id}`);

            // If the key exists, find the corresponding value in the newArray
            if (key) {
              // Find the index in the newArray that contains the id
              let newArrIndex = newArray.findIndex((e) => e[0] && e[0].hasOwnProperty(id));

              // If the index is not -1 and the value exists, insert the value into the newTableRows array
              if (newArrIndex !== -1 && newArray[newArrIndex][index] && newArray[newArrIndex][index][id]) {
                newTableRows[index][key] = newArray[newArrIndex][index][id];
              } else {
                // If the index is -1 or the value does not exist, add 'total_passant_${id}' with '---' to the object
                if (!newTableRows[index]) newTableRows[index] = {}; // Make sure the object exists
                newTableRows[index][`total_passant_${id}`] = '---';
                console.log(`The id "${id}" was not found in the index ${index} of the newArray.`);
              }
            } else {
              // If the key does not exist in the current element, add 'total_passant_${id}' with '---' to the object
              if (!newTableRows[index]) newTableRows[index] = {}; // Make sure the object exists
              newTableRows[index][`total_passant_${id}`] = '---';
              console.log(`The key "passant_${id}" was not found in the object at index ${index}.`);
            }
          }
        });
      });
      
      const projections = [];

      sumOfPercents.map((e, idx) => {
        if (e !== null) {
          const index = idx;
          const sieve = AllSieves[index];
          projections.push({ label: sieve.label, value: e.toFixed(2) });
        }
      });

      sumOfPercents = this.insertBlankPointsOnCurve(sumOfPercents, axisX);

      const higherTolerance = [];
      const lowerTolerance = [];

      for (let i = 0; i < sumOfPercents.length; i++) {
        if (sumOfPercents[i] === null) {
          higherTolerance.push(null);
          lowerTolerance.push(null);
        } else {
          let upperLimit = band.higher[i];
          let lowerLimit = band.lower[i];

          if (i < 9) {
            upperLimit = Math.min(band.higher[i], sumOfPercents[i] + 7);
            lowerLimit = Math.max(band.lower[i], sumOfPercents[i] - 7);
          } else if (i > 8 && i < 16) {
            upperLimit = Math.min(band.higher[i], sumOfPercents[i] + 5);
            lowerLimit = Math.max(band.lower[i], sumOfPercents[i] - 5);
          } else if (i > 15 && i < 19) {
            upperLimit = Math.min(band.higher[i], sumOfPercents[i] + 3);
            lowerLimit = Math.max(band.lower[i], sumOfPercents[i] - 3);
          } else if (i === 19) {
            upperLimit = Math.min(band.higher[i], sumOfPercents[i] + 2);
            lowerLimit = Math.max(band.lower[i], sumOfPercents[i] - 2);
          }

          higherTolerance.push(upperLimit);
          lowerTolerance.push(lowerLimit);
        }
      }

      const pointsOfCurve = [];
      for (let i = 0; i < sumOfPercents.length; i++) {
        pointsOfCurve.push([
          axisX[i],
          band.higher[i],
          higherTolerance[i],
          sumOfPercents[i],
          lowerTolerance[i],
          band.lower[i],
        ]);
      }


      newTableRows.map((row) => {
        Object.values(row).some((value) => {
          if (value === null) {
            Object.keys(row).forEach((key) => {
              if (row[key] === null) {
                row[key] = '---';
              }
            });
          }
        });
      });

      const data = {
        percentsOfMaterials,
        sumOfPercents,
        pointsOfCurve,
        table_data: newTableRows,
        projections,
      };

      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveStep3Data(body: any, userId: string) {
    try {
      this.logger.log(
        'save marshall granulometry composition step on granulometry-composition.marshall.service.ts > [body]',
        { body },
      );

      const { name } = body.granulometryCompositionData;

      const marshallExists: any = await this.marshallRepository.findOne(name, userId);

      const { name: materialName, ...granulometryCompositionWithoutName } = body.granulometryCompositionData;

      const marshallWithGranulometryComposition = {
        ...marshallExists._doc,
        granulometryCompositionData: granulometryCompositionWithoutName,
      };

      await this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithGranulometryComposition);

      if (marshallExists._doc.generalData.step < 3) {
        await this.marshallRepository.saveStep(marshallExists, 3);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  insertBlankPointsOnCurve(curve: number[], axisX: number[]): number[] {
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

  findEquationOfCurve(
    curve: number[],
    axisX: number[],
    y2: number,
    y1: number,
    x2: number,
    x1: number,
    i: number,
  ): number[] {
    if (y1 !== y2) {
      let a = (y2 - y1) / (x2 - x1);
      let b = (y1 * x2 - y2 * x1) / (x2 - x1);
      curve[i] = a * axisX[i] + b;
    } else curve[i] = y1;
    return curve;
  }
}
