import { MathCalculationsUtil } from "./math-calculations.util";
export class DosageCalculationsUtil {
  static confirmPercentsOfDosage(percentageInputs: any[], optimumContent: number): number[] {
    const ids1 = new Set();
    const percentsOfDosage = [];

    Object.keys(percentageInputs[0]).forEach(key => {
      const id = key.split('_')[1];
      ids1.add(id);
      const value = percentageInputs[0][key];
      const index = Array.from(ids1).indexOf(id);
      percentsOfDosage[index] = value;
    });
    
    return percentsOfDosage.map(percent => (100 - optimumContent) * (percent / 100));
  }

  static calculateMaxSpecificGravityGMM(
    maxSpecificGravity: any, 
    trialAsphaltContent: number, 
    optimumContent: number
  ): number {
    const GMMs = [
      maxSpecificGravity.results.lessOne,
      maxSpecificGravity.results.lessHalf,
      maxSpecificGravity.results.normal,
      maxSpecificGravity.results.plusHalf,
      maxSpecificGravity.results.plusOne,
    ];

    const Contents = [
      trialAsphaltContent - 1,
      trialAsphaltContent - 0.5,
      trialAsphaltContent,
      trialAsphaltContent + 0.5,
      trialAsphaltContent + 1,
    ];

    const data = GMMs.map((gmm, i) => gmm ? { x: Contents[i], y: gmm } : null).filter(Boolean);
    const coefficients = MathCalculationsUtil.calculateLinearRegression(data as { x: number; y: number }[]);

    return coefficients.a * optimumContent + coefficients.b;
  }

  static calculateMaxSpecificGravityTraditional(
    formattedPercents: number[], 
    confirmedPercents: number[], 
    listOfSpecificGravities: number[], 
    optimumContent: number
  ): number {
    const denominator = formattedPercents.reduce(
      (acc, percent, i) => acc + confirmedPercents[i] / listOfSpecificGravities[i],
      0,
    );
    return 100 / (denominator + (optimumContent / 1.03));
  }
}