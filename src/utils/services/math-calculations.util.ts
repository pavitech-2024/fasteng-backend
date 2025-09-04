export class MathCalculationsUtil {
  static sumXY(data: { x: number; y: number }[]): number {
    return data.reduce((acc, obj) => acc + obj.x * obj.y, 0);
  }

  static sumX(data: { x: number; y: number }[]): number {
    return data.reduce((acc, obj) => acc + obj.x, 0);
  }

  static sumY(data: { x: number; y: number }[]): number {
    return data.reduce((acc, obj) => acc + obj.y, 0);
  }

  static sumPow2X(data: { x: number; y: number }[]): number {
    return data.reduce((acc, obj) => acc + Math.pow(obj.x, 2), 0);
  }

  static pow2SumX(data: { x: number; y: number }[]): number {
    const sumX = this.sumX(data);
    return Math.pow(sumX, 2);
  }

  static yBar(data: { x: number; y: number }[]): number {
    const sumY = this.sumY(data);
    return sumY / data.length;
  }

  static xBar(data: { x: number; y: number }[]): number {
    const sumX = this.sumX(data);
    return sumX / data.length;
  }

  static calculateLinearRegression(data: { x: number; y: number }[]): { a: number; b: number } {
    const a = (data.length * this.sumXY(data) - this.sumX(data) * this.sumY(data)) /
              (data.length * this.sumPow2X(data) - this.pow2SumX(data));
    const b = this.yBar(data) - a * this.xBar(data);
    return { a, b };
  }

  static calculateVv4(x1: number, y1: number, x2: number, y2: number): number {
    const m = (y2 - y1) / (x2 - x1);
    return ((0.04 - y1) / m) + x1;
  }
}