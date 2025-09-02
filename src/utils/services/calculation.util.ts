export class CalculationUtil {
  static calculateTolerances(sumOfPercents: number[], band: any, axisX: number[]) {
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

    return { higherTolerance, lowerTolerance };
  }

  static generatePointsOfCurve(sumOfPercents: number[], band: any, axisX: number[], higherTolerance: number[], lowerTolerance: number[]) {
    return axisX.map((x, i) => [
      x,
      band.higher[i],
      higherTolerance[i],
      sumOfPercents[i],
      lowerTolerance[i],
      band.lower[i]
    ]);
  }
}