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

      aggregates.forEach((aggregate) => {
        const granulometry: AsphaltGranulometry = granulometrys.find(({ generalData }) => {
          const { material } = generalData;
          return aggregate._id.toString() === material._id.toString();
        });

        const { passant } = granulometry.results;

        let passants = {};

        passant.forEach((p) => {
          passants[p[0]] = p[1];
        });

        console.log(passants);

        granulometry_data.push({
          _id: aggregate._id,
          passants: passants,
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
      const {
        chosenCurves,
        percentageInputs: percentsOfDosage,
        percentsToList,
        dnitBand,
        materials,
        nominalSize,
      } = body;

      let pointsOfCurve = [];
      let band = { higher: [Number], lower: [Number] };
      let sumOfPercents = [];

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

      let granulometryComposition = {
        lower: {
          percentsOfDosage: {
            value: chosenCurves.includes('lower') ? percentsOfDosage[0] : [],
            isEmpty: chosenCurves.includes('lower'),
          },
        },
        average: {
          percentsOfDosage: {
            value: chosenCurves.includes('average') ? percentsOfDosage[1] : [],
            isEmpty: chosenCurves.includes('average'),
          },
        },
        higher: {
          percentsOfDosage: {
            value: chosenCurves.includes('average') ? percentsOfDosage[2] : [],
            isEmpty: chosenCurves.includes('higher'),
          },
        },
      };

      const axisX = [38.1, 25.4, 19.1, 12.7, 9.5, 6.3, 4.8, 2.36, 1.18, 0.6, 0.3, 0.15, 0.075];

      const higherBandA = this.insertBlankPointsOnCurve(
        [
          100, // 38.1
          100, // 25.4
          89, // 19.1
          78, // 12.7
          71, // 9.5
          61, // 6.3
          55, // 4.8
          45, // 2.36
          36, // 1.18
          28, // 0.6
          24, // 0.3
          14, // 0.15
          7, // 0.075
        ],
        axisX,
      );
      const lowerBandA = this.insertBlankPointsOnCurve(
        [
          100, // 38.1
          90, // 25.4
          75, // 19.1
          58, // 12.7
          48, // 9.5
          35, // 6.3
          29, // 4.8
          19, // 2.36
          13, // 1.18
          9, // 0.6
          5, // 0.3
          2, // 0.15
          1, // 0.075
        ],
        axisX,
      );
      const higherBandB = this.insertBlankPointsOnCurve(
        [
          null, // 38.1
          100, // 25.4
          100, // 19.1
          89, // 12.7
          82, // 9.5
          70, // 6.3
          63, // 4.8
          49, // 2.36
          37, // 1.18
          28, // 0.6
          20, // 0.3
          13, // 0.15
          8, // 0.075
        ],
        axisX,
      );
      const lowerBandB = this.insertBlankPointsOnCurve(
        [
          null, // 38.1
          100, // 25.4
          90, // 19.1
          70, // 12.7
          55, // 9.5
          42, // 6.3
          35, // 4.8
          23, // 2.36
          16, // 1.18
          10, // 0.6
          6, // 0.3
          4, // 0.15
          2, // 0.075
        ],
        axisX,
      );
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
      }

      if (granulometryComposition.lower.percentsOfDosage.isEmpty) {
        lowerComposition = this.calculatePercentOfMaterials(materials, percentsOfDosage[0], percentsToList);
        sumOfPercents[0] = lowerComposition.sumOfPercents.map((e) => e);
      }
      // if (granulometryComposition.lower.percentsOfDosage.isEmpty) {
      //   const percentsOfDosageValues = granulometryComposition.lower.percentsOfDosage.value;
      //   lowerComposition = this.calculatePercentOfMaterials(0, materials, percentsOfDosageValues, percentsToList);
      //   sumOfPercents[0] = lowerComposition.sumOfPercents.map((e) => e);
      // }

      if (granulometryComposition.average.percentsOfDosage.isEmpty) {
        averageComposition = this.calculatePercentOfMaterials(materials, percentsOfDosage[1], percentsToList);
        sumOfPercents[1] = averageComposition.sumOfPercents.map((e) => e);
      }

      if (granulometryComposition.higher.percentsOfDosage.isEmpty) {
        higherComposition = this.calculatePercentOfMaterials(materials, percentsOfDosage[2], percentsToList);
        sumOfPercents[2] = higherComposition.sumOfPercents.map((e) => e);
      }

      if (granulometryComposition.lower.percentsOfDosage.isEmpty) {
        sumOfPercents[0] = this.insertBlankPointsOnCurve(sumOfPercents[0], axisX);
      } else {
        sumOfPercents[0] = [null, null, null, null, null, null, null, null, null, null, null, null, null];
      }

      if (granulometryComposition.average.percentsOfDosage.isEmpty) {
        sumOfPercents[1] = this.insertBlankPointsOnCurve(sumOfPercents[1], axisX);
      } else {
        sumOfPercents[1] = [null, null, null, null, null, null, null, null, null, null, null, null, null];
      }

      if (granulometryComposition.higher.percentsOfDosage.isEmpty) {
        sumOfPercents[2] = this.insertBlankPointsOnCurve(sumOfPercents[2], axisX);
      } else {
        sumOfPercents[2] = [null, null, null, null, null, null, null, null, null, null, null, null, null];
      }

      for (let i = 0; i < nominalSize.curve.length; i++) {
        pointsOfCurve.push([
          Math.pow(axisX[i] / nominalSize.value, 0.45),
          nominalSize.controlPoints.lower[i],
          nominalSize.controlPoints.higher[i],
          nominalSize.restrictedZone.lower[i],
          nominalSize.restrictedZone.higher[i],
          nominalSize.curve[i],
          band.higher[i],
          band.lower[i],
        ]);
      }

      if (granulometryComposition.lower.percentsOfDosage.isEmpty) {
        for (let i = 0; i < 13; i++) {
          pointsOfCurve[i].push(sumOfPercents[0][i]);
        }
      }
      if (granulometryComposition.average.percentsOfDosage.isEmpty) {
        for (let i = 0; i < 13; i++) {
          pointsOfCurve[i].push(sumOfPercents[1][i]);
        }
      }
      if (granulometryComposition.higher.percentsOfDosage.isEmpty) {
        for (let i = 0; i < 13; i++) {
          pointsOfCurve[i].push(sumOfPercents[2][i]);
        }
      }

      pointsOfCurve = pointsOfCurve;

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
      throw error;
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
    let percentsOfMaterialsToShow = [];
    let newPercentsOfDosage = [];
    let materialsWithoutBinder = materials.filter(
      (material) => material.type !== 'asphaltBinder' && material.type !== 'CAP' && material.type !== 'other',
    );

    for (let i = 0; i < percentsToList.length; i++) {
      percentsOfMaterialsToShow.push([]);
    }

    percentsToList.forEach((arr, idx) => {
      arr.forEach((subArr, i) => {
        if (!percentsOfMaterialsToShow[idx][i]) {
          percentsOfMaterialsToShow[idx][i] = [];
        }

        if (Array.isArray(subArr) && subArr.length > 1) {
          percentsOfMaterialsToShow[idx][i] = subArr[1];
        } else {
          percentsOfMaterialsToShow[idx][i] = subArr;
        }
      });
    });

    Object.values(percentsOfDosage).forEach((value) => {
      newPercentsOfDosage.push(value);
    });

    let sumOfPercents = [null, null, null, null, null, null, null, null, null, null, null, null, null];

    let percentsOfMaterials = [];

    for (let i = 0; i < materialsWithoutBinder.length; i++) {
      percentsOfMaterials.push([]);
      for (let j = 0; j < percentsOfMaterialsToShow[i].length; j++) {
        if (percentsOfMaterialsToShow[i][j] !== null) {
          percentsOfMaterials[i][j] = (percentsOfMaterialsToShow[i][j] * newPercentsOfDosage[i]) / 100;
          sumOfPercents[j] += percentsOfMaterials[i][j];
        } else {
          percentsOfMaterials[i][j] = null;
        }
      }
    }

    return { sumOfPercents, percentsOfMaterials };
  }

  async saveStep4Data(body: any, userId: string) {
    try {
      this.logger.log(
        'save superpave granulometry composition step on granulometry-composition.superpave.service.ts > [body]',
        { body },
      );

      const { name } = body.granulometryCompositionData;

      const superpaveExists: any = await this.superpaveRepository.findOne(name, userId);

      const { name: materialName, ...granulometryCompositionWithoutName } = body.granulometryCompositionData;

      const superpaveWithGranulometryComposition = {
        ...superpaveExists._doc,
        granulometryCompositionData: granulometryCompositionWithoutName,
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
