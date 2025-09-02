import { Injectable, Logger } from '@nestjs/common';
import { AsphaltGranulometryRepository } from '../../../essays/granulometry/repository';
import { AllSieves } from '../../../../../utils/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Marshall, MarshallDocument } from '../schemas';
import { MarshallRepository } from '../repository';
import { 
  CurveInterpolationUtil,
  DataTransformationUtil,
  CalculationUtil,
  DNIT_BANDS,
  axisX
} from '../../../../../utils/services';


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
      const granulometrys = await this.granulometry_repository.findAll();
      
      const granulometry_data = DataTransformationUtil.transformGranulometryData(granulometrys, aggregates);
      const table_data = DataTransformationUtil.generateTableStructure(granulometry_data);

      this.logger.log(table_data.tableRows);
      this.logger.log(table_data.tableColumnHeaders);

      return table_data;
    } catch (error) {
      throw error;
    }
  }

   async calculateGranulometry(body: any) {
    try {
      const { dnitBands, percentageInputs, tableRows } = body;

      // Processamento dos percentuais de dosagem
      let percentsOfDosage = [];
      const ids1 = new Set();

      Object.keys(percentageInputs[0]).forEach((key) => {
        const id = key.split('_')[1];
        ids1.add(id);
        const value = percentageInputs[0][key];
        const index = Array.from(ids1).indexOf(id);
        percentsOfDosage[index] = { [id]: value };
      });

      // Inicialização dos materiais
      const ids2 = new Set();
      let percentsOfMaterials = [];

      for (let i = 0; i < percentsOfDosage.length; i++) {
        let obj = percentsOfDosage[i];
        let key = Object.keys(obj)[0];
        percentsOfMaterials.push(Array(20).fill({ [key]: null }));
      }

      let newTableRows = tableRows;

      // Processamento dos dados da tabela
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

    
      // Obtenção das bandas DNIT com interpolação
      const bandData = DNIT_BANDS[dnitBands];
      const band = {
        higher: CurveInterpolationUtil.insertBlankPointsOnCurve([...bandData.higher], axisX),
        lower: CurveInterpolationUtil.insertBlankPointsOnCurve([...bandData.lower], axisX)
      };

      let sumOfPercents = Array(24).fill(null);

      // Cálculo dos percentuais
      for (let i = 0; i < percentsOfMaterials.length; i++) {
        for (let j = 0; j < 20; j++) {
          let materialValue = Object.values(percentsOfMaterials[i][j])[0] as number;
          let materialKey = Object.keys(percentsOfMaterials[i][j])[0];

          if (materialValue !== null) {
            let dosageObject = percentsOfDosage.find((e) => e.hasOwnProperty(materialKey));
            let dosageValue = dosageObject ? dosageObject[materialKey] : null;

            if (materialValue !== null && dosageValue !== null) {
              let value = (materialValue * dosageValue) / 100;
              percentsOfMaterials[i][j] = { [materialKey]: value };
              sumOfPercents[j] = (sumOfPercents[j] || 0) + value;
            }
          } else {
            percentsOfMaterials[i][j] = null;
          }
        }
      }

      // Atualização da tabela
      tableRows.forEach((element, index) => {
        Object.keys(element).forEach((keys) => {
          const stringIndex = keys.indexOf('_');
          const label = keys.substring(0, stringIndex);
          const id = keys.substring(stringIndex + 1);

          if (label === 'passant') {
            const newArray = percentsOfMaterials.map(innerArray => 
              innerArray.filter(value => value !== null)
            );

            const key = Object.keys(tableRows[index]).find((k) => k === `passant_${id}`);
            
            if (key) {
              let newArrIndex = newArray.findIndex((e) => e[0] && e[0].hasOwnProperty(id));
              
              if (newArrIndex !== -1 && newArray[newArrIndex][index] && newArray[newArrIndex][index][id]) {
                newTableRows[index][key] = newArray[newArrIndex][index][id];
              } else {
                if (!newTableRows[index]) newTableRows[index] = {};
                newTableRows[index][`total_passant_${id}`] = '---';
              }
            } else {
              if (!newTableRows[index]) newTableRows[index] = {};
              newTableRows[index][`total_passant_${id}`] = '---';
            }
          }
        });
      });

      // Projeções
      const projections = [];
      sumOfPercents.forEach((e, idx) => {
        if (e !== null) {
          const sieve = AllSieves[idx];
          projections.push({ label: sieve.label, value: e.toFixed(2) });
        }
      });

      // Interpolação da curva principal
      sumOfPercents = CurveInterpolationUtil.insertBlankPointsOnCurve(sumOfPercents, axisX);

      // Cálculo de tolerâncias
      const { higherTolerance, lowerTolerance } = 
        CalculationUtil.calculateTolerances(sumOfPercents, band, axisX);

      // Geração dos pontos da curva
      const pointsOfCurve = CalculationUtil.generatePointsOfCurve(
        sumOfPercents, band, axisX, higherTolerance, lowerTolerance
      );

      // Limpeza dos valores nulos na tabela
      newTableRows.forEach((row) => {
        Object.keys(row).forEach((key) => {
          if (row[key] === null) {
            row[key] = '---';
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
