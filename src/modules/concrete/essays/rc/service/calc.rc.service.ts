import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Calc_CONCRETERC_Dto, Calc_CONCRETERC_Out } from '../dto/calc.rc.dto';
import { concreteRcToleranceAge, correctionFactorArr } from './referenceTables';
import { RC_step2Data } from '../schemas';

@Injectable()
export class Calc_CONCRETERC_Service {
  private logger = new Logger(Calc_CONCRETERC_Service.name);

  constructor() {}

  async calculateRc({ step2Data }: Calc_CONCRETERC_Dto): Promise<{ success: boolean; result: Calc_CONCRETERC_Out }> {
    try {
      this.logger.log('calculate rc on calc.rc.service.ts > [body]');

      const samples = step2Data;
      let correctionRefs = new Array(samples.length).fill(null);

      const result = {
        tolerances: new Array(samples.length).fill(null),
        correctionFactors: new Array(samples.length).fill(null),
        finalResult: new Array(samples.length).fill(null),
      };

      const toleranceRefs = this.findToleranceRefs(samples);

      result.tolerances = this.calculateTolerance(samples, toleranceRefs);

      // Verificação da condicional de relação altura/diametro
      for (let i = 0; i < samples.length; i++) {
        const diammeterRatio = (samples[i].diammeter1 + samples[i].diammeter2) / 2;
        const heightDiammeterRatio = samples[i].height / diammeterRatio;

        if (heightDiammeterRatio >= 2.06) {
          throw new BadRequestException('Diameter ratio needs to be smaller than 2.06');
        } else if (heightDiammeterRatio <= 1.94) {
          const correctionRefsValue = this.findCorrectionFactorRefs(heightDiammeterRatio);
          correctionRefs[i] = correctionRefsValue;
        } else if (heightDiammeterRatio >= 1.94 && heightDiammeterRatio <= 2.06) {
          correctionRefs[i] = heightDiammeterRatio;
          result.correctionFactors[i] = heightDiammeterRatio;
        }
      }

      result.correctionFactors = this.calculateCorrectionFactor(samples, correctionRefs);

      result.finalResult = this.calculateFinalResults(samples, result.correctionFactors);

      return {
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }
  
  calculateFinalResults(samples: RC_step2Data[], correctionFactors: number[]): number[] {
    const results = new Array(samples.length);
    const factor = 4 / Math.PI;

    for (let i = 0; i < samples.length; i++) {
      const averageDiameter = (samples[i].diammeter1 + samples[i].diammeter2) / 2;
      results[i] = factor * correctionFactors[i] / averageDiameter ** 2;
    }

    return results;
  }

  findToleranceRefs(samples: Calc_CONCRETERC_Dto['step2Data']) {
    try {
      this.logger.log('find refs on calc.rc.service.ts > [body]');

      let higherReference = new Array(samples.length).fill(null);

      let lowerReference = new Array(samples.length).fill(null);

      for (let i = 0; i < samples.length; i++) {
        const toleranceFound = concreteRcToleranceAge.find((e) => e.age * 60 === samples[i].age);

        if (toleranceFound) {
          higherReference[i] = toleranceFound;
          lowerReference[i] = toleranceFound;
        } else {
          let lowerIndex: number | undefined;
          let higherIndex: number | undefined;

          for (let j = 0; j < concreteRcToleranceAge.length; j++) {
            if (concreteRcToleranceAge[j].age * 60 < samples[i].age) {
              lowerIndex = j;
            } else if (concreteRcToleranceAge[j].age * 60 > samples[i].age) {
              higherIndex = j;
              break;
            }
          }

          const higherReferenceArr = higherIndex !== undefined ? concreteRcToleranceAge[higherIndex] : null;
          higherReference[i] = higherReferenceArr;
          const lowerReferenceArr = lowerIndex !== undefined ? concreteRcToleranceAge[lowerIndex] : null;
          lowerReference[i] = lowerReferenceArr;
        }
      }

      return { higherReference, lowerReference };
    } catch (error) {
      throw error;
    }
  }

  findCorrectionFactorRefs(heightDiammeterRatio: number) {
    try {
      this.logger.log('find refs on calc.rc.service.ts > [body]');

      let higherReference;
      let lowerReference;

      const correctionFound = correctionFactorArr.find((e) => e.diammHeightRatio === heightDiammeterRatio);

      if (correctionFound) {
        higherReference = correctionFound;
        lowerReference = correctionFound;
      } else {
        let lowerIndex: number | undefined;
        let higherIndex: number | undefined;

        for (let j = 0; j < correctionFactorArr.length; j++) {
          if (
            correctionFactorArr[j].diammHeightRatio <= heightDiammeterRatio &&
            correctionFactorArr[j + 1]?.diammHeightRatio > heightDiammeterRatio
          ) {
            lowerIndex = j;
            higherIndex = j + 1;
            break;
          }
        }

        higherReference = higherIndex !== undefined ? correctionFactorArr[higherIndex] : null;
        lowerReference = lowerIndex !== undefined ? correctionFactorArr[lowerIndex] : null;
      }
      return { higherReference, lowerReference };
    } catch (error) {
      throw error;
    }
  }

  calculateTolerance(samples, refs): Array<{ age: number; tolerance: number }> {
    try {
      this.logger.log('calculate tolerance on calc.rc.service.ts > [body]');

      const { higherReference, lowerReference } = refs;
      const averageDiammeters = new Array(samples.length).fill(null);
      const tolerances = new Array(samples.length).fill(null);
      let toleranceRatio;

      for (let i = 0; i < samples.length; i++) {
        if (refs.higherReference[i].age !== refs.lowerReference[i].age) {
          const ageDifference = higherReference[i].age * 60 - lowerReference[i].age * 60;
          const toleranceDifference = higherReference[i].tolerance * 60 - lowerReference[i].tolerance * 60;

          const averageDiammeter = (samples[i].diammeter1 + samples[i].diammeter2) / 2;
          averageDiammeters[i] = averageDiammeter;

          const ageInput = higherReference[i].age * 60 - samples[i].age;
          const ageRatio = ageDifference / ageInput;
          const toleranceValue = (ageRatio * higherReference[i].tolerance) / toleranceDifference;
          toleranceRatio = toleranceValue / higherReference[i].tolerance;
          tolerances[i] = toleranceRatio;
        } else {
          toleranceRatio = refs.higherReference[i].tolerance;
          tolerances[i] = toleranceRatio;
        }

        const { success } = this.verifyToleranceInput(samples[i].tolerance, toleranceRatio);

        if (!success) {
          throw new BadRequestException(`Invalid tolerance input > index: ${i}`);
        }
      }

      return tolerances;
    } catch (error) {
      throw error;
    }
  }

  calculateCorrectionFactor(samples, correctionRefs) {
    try {
      this.logger.log('calculate correction factor on calc.rc.service.ts > [body]');

      let correctionFactor = new Array(samples.length).fill(null);

      for (let i = 0; i < samples.length; i++) {
        if (correctionRefs[i] !== null && Object.keys(correctionRefs[i]).some((key) => key === 'higherReference')) {
          const averageDiammeter = (samples[i].diammeter1 + samples[i].diammeter2) / 2;
          const heightDiammeterRatio = Number((samples[i].height / averageDiammeter).toFixed(2));

          // Validate height/diameter ratio
          if (heightDiammeterRatio >= 2.06) {
            throw new BadRequestException('Diameter ratio needs to be smaller than 2.06');
          } else if (heightDiammeterRatio <= 1.94) {
            // Find correction factor directly or perform interpolation
            const correctionFound = correctionFactorArr.find((e) => e.diammHeightRatio === heightDiammeterRatio);
            if (!correctionFound) {
              // Perform interpolation if exact match is not found
              const diammterRatioDifference =
                correctionRefs[i].higherReference.diammHeightRatio - correctionRefs[i].lowerReference.diammHeightRatio;
              const correctionFactorDifference =
                correctionRefs[i].higherReference.correctionFactor - correctionRefs[i].lowerReference.correctionFactor;

              const value = correctionRefs[i].higherReference.diammHeightRatio - heightDiammeterRatio;
              const formattedValue = Number(value.toFixed(2));

              const ratio = diammterRatioDifference / formattedValue;

              const ratio2 = correctionFactorDifference / ratio;

              const finalInterpolation = correctionRefs[i].higherReference.correctionFactor - ratio2;

              const correctionRatio = finalInterpolation * samples[i].maximumStrenghth;

              correctionFactor[i] = correctionRatio;
            } else if (heightDiammeterRatio <= 1.94 && heightDiammeterRatio >= 2.06) {
              // Use the height/diameter ratio directly if within range
              correctionFactor[i] = heightDiammeterRatio;
            }
          }
        }
      }
      return correctionFactor;
    } catch (error) {
      throw error;
    }
  }

  verifyToleranceInput(samples, toleranceRatio) {
    try {
      this.logger.log('verify tolerance input on calc.rc.service.ts > [body]');

      if (samples > toleranceRatio + 10 && samples < toleranceRatio - 10) {
        return {
          success: false,
          error: 'tolarance ratio is not permitted.',
        };
      }

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
