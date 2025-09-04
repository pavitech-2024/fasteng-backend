import { MathCalculationsUtil } from "./math-calculations.util";
export class CurveEquationsUtil {
  static calculateEquationVv(data: { x: number; y: number }[]): { a: number; b: number } {
    return MathCalculationsUtil.calculateLinearRegression(data);
  }

  static calculateEquationRBV(data: { x: number; y: number }[]): { a: number; b: number } {
    return MathCalculationsUtil.calculateLinearRegression(data);
  }

  static calculateVv(x: number, curveVv: { a: number; b: number }): number {
    return curveVv.a * x + curveVv.b;
  }

  static calculateRBV(x: number, curveRBV: { a: number; b: number }): number {
    return curveRBV.a * x + curveRBV.b;
  }

  static calculateContentVv(y: number, curveVv: { a: number; b: number }): number {
    return (y - curveVv.b) / curveVv.a;
  }

  static calculateContentRBV(y: number, curveRBV: { a: number; b: number }): number {
    return (y - curveRBV.b) / curveRBV.a;
  }
}