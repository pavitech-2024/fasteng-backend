export class CurveInterpolationUtil {
  static insertBlankPointsOnCurve(curve: number[], axisX: number[]): number[] {
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

  static findEquationOfCurve(
    curve: number[],
    axisX: number[],
    y2: number,
    y1: number,
    x2: number,
    x1: number,
    i: number
  ): number[] {
    if (y1 !== y2) {
      const a = (y2 - y1) / (x2 - x1);
      const b = (y1 * x2 - y2 * x1) / (x2 - x1);
      curve[i] = a * axisX[i] + b;
    } else {
      curve[i] = y1;
    }
    return curve;
  }
}