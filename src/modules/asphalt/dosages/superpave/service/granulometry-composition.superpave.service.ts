import { Injectable, Logger } from '@nestjs/common';
import { AsphaltGranulometryRepository } from '../../../essays/granulometry/repository';
import { AsphaltGranulometry } from '../../../essays/granulometry/schemas';
import { AllSieves } from '../../../../../utils/interfaces';

@Injectable()
export class GranulometryComposition_Superpave_Service {
  private logger = new Logger(GranulometryComposition_Superpave_Service.name);

  constructor(private readonly granulometry_repository: AsphaltGranulometryRepository) {}

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
      const { chosenCurves, percentageInputs: percentsOfDosage, dnitBand, materials, nominalSize } = body;

      let pointsOfCurve;
      let band = { higher: [Number], lower: [Number] };
      let sumOfPercents = [];

      let lowerComposition = {
        sumOfPercents: [],
      };
      

      let averageComposition = {
        sumOfPercents: [],
      };

      let higherComposition = {
        sumOfPercents: [],
      };

      let granulometryComposition = {
        lower: {
          percentsOfDosage: {
            value: [],
            isEmpty: true,
          },
        },
        average: {
          percentsOfDosage: {
            value: [],
            isEmpty: true,
          },
        },
        higher: {
          percentsOfDosage: {
            value: [],
            isEmpty: true,
          },
        },
      };

      if (chosenCurves.lower && percentsOfDosage[0].length !== 0) {
        granulometryComposition.lower.percentsOfDosage.value = percentsOfDosage[0];
        granulometryComposition.lower.percentsOfDosage.isEmpty = false;
      } else {
        granulometryComposition.lower.percentsOfDosage.isEmpty = true;
      }

      if (chosenCurves.average && percentsOfDosage[1].length !== 0) {
        granulometryComposition.average.percentsOfDosage.value = percentsOfDosage[1];
        granulometryComposition.average.percentsOfDosage.isEmpty = false;
      } else {
        granulometryComposition.average.percentsOfDosage.isEmpty = true;
      }

      if (chosenCurves.higher && percentsOfDosage[2].length !== 0) {
        granulometryComposition.higher.percentsOfDosage.value = percentsOfDosage[2];
        granulometryComposition.higher.percentsOfDosage.isEmpty = false;
      } else {
        granulometryComposition.higher.percentsOfDosage.isEmpty = true;
      }

      const axisX = [
        75, 64, 50, 37.5, 32, 25, 19, 12.5, 9.5, 6.3, 4.8, 2.4, 2, 1.2, 0.6, 0.43, 0.3, 0.18, 0.15, 0.075, 0,
      ];

      const higherBandA = this.insertBlankPointsOnCurve(
        [null, null, 100, 100, null, 100, 90, null, 65, null, 50, null, 40, null, null, 30, null, 20, null, 8],
        axisX,
      );
      const lowerBandA = this.insertBlankPointsOnCurve(
        [null, null, 100, 95, null, 75, 60, null, 35, null, 25, null, 20, null, null, 10, null, 5, null, 1],
        axisX,
      );
      const higherBandB = this.insertBlankPointsOnCurve(
        [null, null, null, 100, null, 100, 100, null, 80, null, 60, null, 45, null, null, 32, null, 20, null, 8],
        axisX,
      );
      const lowerBandB = this.insertBlankPointsOnCurve(
        [null, null, null, 100, null, 95, 80, null, 45, null, 28, null, 20, null, null, 10, null, 8, null, 3],
        axisX,
      );
      const higherBandC = this.insertBlankPointsOnCurve(
        [null, null, null, null, null, null, 100, 100, 90, null, 72, null, 50, null, null, 26, null, 16, null, 10],
        axisX,
      );
      const lowerBandC = this.insertBlankPointsOnCurve(
        [null, null, null, null, null, null, 100, 80, 70, null, 44, null, 22, null, null, 8, null, 4, null, 2],
        axisX,
      );

      if (dnitBand === 'A') {
        band = { higher: higherBandA, lower: lowerBandA };
      } else if (dnitBand === 'B') {
        band = { higher: higherBandB, lower: lowerBandB };
      } else if (dnitBand === 'C') {
        band = { higher: higherBandC, lower: lowerBandC };
      }

      if (!granulometryComposition.lower.percentsOfDosage.isEmpty) {
        lowerComposition = this.calculatePercentOfMaterials(0, materials, percentsOfDosage);
        sumOfPercents[0] = lowerComposition.sumOfPercents.map((e) => e);
      }

      if (!granulometryComposition.average.percentsOfDosage.isEmpty) {
        averageComposition = this.calculatePercentOfMaterials(1, materials, percentsOfDosage);
        sumOfPercents[1] = averageComposition.sumOfPercents.map((e) => e);
      }

      if (!granulometryComposition.higher.percentsOfDosage.isEmpty) {
        higherComposition = this.calculatePercentOfMaterials(2, materials, percentsOfDosage);
        sumOfPercents[2] = higherComposition.sumOfPercents.map((e) => e);
      }

      if (!granulometryComposition.lower.percentsOfDosage.isEmpty) {
        sumOfPercents[0] = this.insertBlankPointsOnCurve(sumOfPercents[0], axisX);
      } else {
        sumOfPercents[0] = [
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
      }

      if (!granulometryComposition.average.percentsOfDosage.isEmpty) {
        sumOfPercents[1] = this.insertBlankPointsOnCurve(
          sumOfPercents[1],
          axisX
        );
      } else {
        sumOfPercents[1] = [
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
      }

      if (!granulometryComposition.higher.percentsOfDosage.isEmpty) {
        sumOfPercents[2] = this.insertBlankPointsOnCurve(
          sumOfPercents[2],
          axisX
        );
      } else {
        sumOfPercents[2] = [
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
      }
        
      for (let i = 0; i < 20 + 1; i++) {
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

      if (!granulometryComposition.lower.percentsOfDosage.isEmpty) {
        for (let i = 0; i < 20 + 1; i++) {
          pointsOfCurve[i].push(sumOfPercents[0][i]);
        }
      }
      if (!granulometryComposition.average.percentsOfDosage.isEmpty) {
        for (let i = 0; i < 20 + 1; i++) {
          pointsOfCurve[i].push(sumOfPercents[1][i]);
        }
      }
      if (!granulometryComposition.higher.percentsOfDosage.isEmpty) {
        for (let i = 0; i < 20 + 1; i++) {
          pointsOfCurve[i].push(sumOfPercents[2][i]);
        }
      }

      pointsOfCurve = pointsOfCurve;
      const data = {
        lowerComposition,
        averageComposition,
        higherComposition,
        pointsOfCurve,
        nominalSize: nominalSize.value,
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

  calculatePercentOfMaterials(band, materials, percentsOfDosage) {
    let percentsOfMaterialsToShow = [];

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
    ];

    let percentsOfMaterials = [];

    for (let i = 0; i < materials.length; i++) {
      percentsOfMaterials.push([]);
      for (let j = 0; j < percentsOfMaterialsToShow[i].length; j++) {
        if (percentsOfMaterialsToShow[i][j] !== null) {
          percentsOfMaterials[i][j] = (percentsOfMaterialsToShow[i][j] * percentsOfDosage[band][i]) / 100;
          sumOfPercents[j] += percentsOfMaterials[i][j];
        } else {
          percentsOfMaterials[i][j] = null;
        } 
      }
    }

    return { sumOfPercents, percentsOfMaterials };
  }
}
