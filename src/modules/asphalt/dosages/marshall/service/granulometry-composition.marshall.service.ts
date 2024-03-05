import { Injectable, Logger } from "@nestjs/common";
import { AsphaltGranulometryRepository } from "../../../essays/granulometry/repository";
import { AsphaltGranulometry } from "../../../essays/granulometry/schemas";
import { AllSieves } from "utils/interfaces";

@Injectable()
export class GranulometryComposition_Marshall_Service {
  private logger = new Logger(GranulometryComposition_Marshall_Service.name)

  constructor(
    private readonly granulometry_repository: AsphaltGranulometryRepository,
  ) { }

  async getGranulometryData(aggregates: { _id: string, name: string }[]) {
    try {

      const granulometry_data: {
        _id: string;
        passants: {}
      }[] = []

      const granulometrys = await this.granulometry_repository.findAll();

      aggregates.forEach(aggregate => {
        const granulometry: AsphaltGranulometry = granulometrys.find(({ generalData }) => {
          const { material } = generalData
          return aggregate._id.toString() === material._id.toString()
        });

        const { passant } = granulometry.results;

        let passants = {}

        passant.forEach(p => {
          passants[p[0]] = p[1]
        })

        console.log(passants)

        granulometry_data.push({
          _id: aggregate._id,
          passants: passants,
        });

      });

      //
      const table_column_headers: string[] = []
      const table_rows = [];

      table_column_headers.push('sieve_label')

      AllSieves.forEach((sieve) => {

        const contains = granulometry_data.some(aggregate => (sieve.label in aggregate.passants))

        if (contains) {
          const aggregates_data = {}
          granulometry_data.forEach(aggregate => {
            const { _id, passants } = aggregate

            // aggregates_data[_id] = {}
            // aggregates_data[_id]['_id'] = _id
            aggregates_data['total_passant_'.concat(_id)] = passants[sieve.label]
            aggregates_data['passant_'.concat(_id)] = null

            // adicionando as colunas à tabela
            if (!table_column_headers.some(header => (header.includes(_id)))) {
              table_column_headers.push('total_passant_'.concat(_id))
              table_column_headers.push('passant_'.concat(_id))
            }
          })
          table_rows.push({ sieve_label: sieve.label, ...aggregates_data })
        }
      })

      this.logger.log(table_rows)
      this.logger.log(table_column_headers)

      const table_data = {
        table_column_headers,
        table_rows
      }
      //

      return table_data

    } catch (error) {
      throw error
    }
  }

  async calculateGranulometry(body: any) {
    try {
      const {
        dnitBands,
        percentageInputs,
        tableRows,
        step
      } = body;

      let result = {
        tolerance: {
          higher: [],
          lower: []
        },
        percentsOfMaterials: [],
        pointsOfCurve: []
      }

      let percentsOfDosage = [];

      let listPercentsToReturn = [[], []];
      let materials = [];
      const ids1 = new Set();

      Object.keys(percentageInputs[0]).forEach(key => {
        const id = key.split('_')[1];
        ids1.add(id);
        const value = percentageInputs[0][key];
        const index = Array.from(ids1).indexOf(id);
        materials[index] = value;
        //materials.push({ id, value });
      });

      console.log("🚀 ~ GranulometryComposition_Marshall_Service ~ calculateGranulometry ~ materials:", materials)

      const ids2 = new Set();

      tableRows.forEach(element => {
        Object.keys(element).forEach(key => {
          const idIndex = key.lastIndexOf('_');
          if (idIndex !== -1) {
            const firstString = key.substring(0, idIndex);

            if (firstString === 'total_passant') {
              const id = key.substring(idIndex + 1);
              ids2.add(id);
              const value = element[key];
              const index = Array.from(ids2).indexOf(id);
              listPercentsToReturn[index].push(value);
            }
          }
        })
      });

      const axisX = [76, 64, 50, 38, 32, 25, 19, 12.5, 9.5, 6.3, 4.8, 2.4, 2, 1.2, 0.85, 0.6, 0.43, 0.3, 0.25, 0.18, 0.15, 0.106, 0.075];
      let higherBandA = this.insertBlankPointsOnCurve([null, null, 100, 100, null, 100, 90, null, 65, null, 50, null, 40, null, null, 30, null, 20, null, 8], axisX);
      let lowerBandA = this.insertBlankPointsOnCurve([null, null, 100, 95, null, 75, 60, null, 35, null, 25, null, 20, null, null, 10, null, 5, null, 1], axisX);
      let higherBandB = this.insertBlankPointsOnCurve([null, null, null, 100, null, 100, 100, null, 80, null, 60, null, 45, null, null, 32, null, 20, null, 8], axisX);
      let lowerBandB = this.insertBlankPointsOnCurve([null, null, null, 100, null, 95, 80, null, 45, null, 28, null, 20, null, null, 10, null, 8, null, 3], axisX);
      let higherBandC = this.insertBlankPointsOnCurve([null, null, null, null, null, null, 100, 100, 90, null, 72, null, 50, null, null, 26, null, 16, null, 10], axisX);
      let lowerBandC = this.insertBlankPointsOnCurve([null, null, null, null, null, null, 100, 80, 70, null, 44, null, 22, null, null, 8, null, 4, null, 2], axisX);

      let band = { higher: [], lower: [] };

      if (dnitBands === "A") band = { higher: higherBandA, lower: lowerBandA };
      else if (dnitBands === "B") band = { higher: higherBandB, lower: lowerBandB };
      else if (dnitBands === "C") band = { higher: higherBandC, lower: lowerBandC };
      let sumOfPercents = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];


      // const percentsOfMaterials = percentsOfDosage.map((percentage: any[], i: string | number) => {
      //   return percentage.map((percent, j) => {
      //     if (result.listPercentsToReturn[i][j] !== null) {
      //       const updatedPercent = (percent * percentsOfDosage[i]) / 100;
      //       result.sumOfPercents[j] += updatedPercent;
      //       return updatedPercent;
      //     }
      //     return null;
      //   });
      // });

      // const percentsOfMaterials = materials.map((percentage: any[], i: string | number) => {
      //   return percentage.map((percent, j) => {
      //     if (result.listPercentsToReturn[i][j] !== null) {
      //       const updatedPercent = (percent * materials[i]) / 100;
      //       result.sumOfPercents[j] += updatedPercent;
      //       return updatedPercent;
      //     }
      //     return null;
      //   });
      // });

      for (let i = 0; i < listPercentsToReturn.length; i++) {
        for (let j = 0; j < 20; j++) {
          if (listPercentsToReturn[i][j] !== null) {
            if (listPercentsToReturn[i][j] !== null) {
              listPercentsToReturn[i][j] = (listPercentsToReturn[i][j] * materials[i]) / 100;
              sumOfPercents[j] += listPercentsToReturn[i][j];
            }
          } else listPercentsToReturn[i][j] = null;
        }
      }

      // const sumOfPercentsToReturn = result.sumOfPercents;
      // const sumOfPercents = this.insertBlankPointsOnCurve(result.sumOfPercents, axisX);

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
        pointsOfCurve.push([axisX[i], band.higher[i], higherTolerance[i], sumOfPercents[i], lowerTolerance[i], band.lower[i]]);
      }

      // result.tolerance.higher = higherTolerance;
      // result.tolerance.lower = lowerTolerance;
      // result.percentsOfMaterials = listPercentsToReturn;
      // result.pointsOfCurve = pointsOfCurve;

      // if (step < 3) result.step = 3;

      return { listPercentsToReturn, sumOfPercents, pointsOfCurve };
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
                curve = this.findEquationOfCurve(curve, axisX,
                  curve[i - 1], curve[j],
                  axisX[i - 1], axisX[j],
                  i);
                break;
              }
            }
          }
        }
      }
    }

    return curve;
  }

  findEquationOfCurve(curve: number[], axisX: number[], y2: number, y1: number, x2: number, x1: number, i: number): number[] {
    if (y1 !== y2) {
      let a = (y2 - y1) / (x2 - x1);
      let b = ((y1 * x2) - (y2 * x1)) / (x2 - x1);
      curve[i] = (a * axisX[i]) + b;
    }
    else curve[i] = y1;
    return curve;
  }
}