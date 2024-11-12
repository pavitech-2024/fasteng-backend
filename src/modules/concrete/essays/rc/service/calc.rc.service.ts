import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Calc_CONCRETERC_Dto, Calc_CONCRETERC_Out } from '../dto/calc.rc.dto';
import { concreteRcToleranceAge, correctionFactorArr } from './referenceTables';

@Injectable()
export class Calc_CONCRETERC_Service {
  private logger = new Logger(Calc_CONCRETERC_Service.name);

  constructor() {}

  async calculateRc({ step2Data, step3Data }: Calc_CONCRETERC_Dto): Promise<{ success: boolean, result: Calc_CONCRETERC_Out }> {
    try {
      this.logger.log('calculate rc on calc.rc.service.ts > [body]');

      const samples = step2Data;
      const { maximumStrength } = step3Data;

      const result = {
        tolerances: new Array(samples.length).fill(null),
        correctionFactors: new Array(samples.length).fill(null)
      }

      const toleranceRefs = this.findToleranceRefs(samples);

      for (let i = 0; i < samples.length; i++) {
        if (toleranceRefs.higherReference[i].age !== toleranceRefs.lowerReference[i].age) {
          result.tolerances = this.calculateTolerance(samples, toleranceRefs);
        } else {
          result.tolerances[i] = concreteRcToleranceAge[i];
        }
      }

      const correctionRefs = this.findCorrectionFactorRefs(samples);

      for (let i = 0; i < samples.length; i++) {
        result.correctionFactors = this.calculateCorrectionFactor(maximumStrength, samples, correctionRefs);
      }

      return {
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
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

  findCorrectionFactorRefs(samples: Calc_CONCRETERC_Dto['step2Data']) {
    try {
      this.logger.log('find refs on calc.rc.service.ts > [body]');

      let higherReference = new Array(samples.length).fill(null);
      let lowerReference = new Array(samples.length).fill(null);

      for (let i = 0; i < samples.length; i++) {
        const averageDiammeter = (samples[i].diammeter1 + samples[i].diammeter2) / 2;
        const correctionFound = correctionFactorArr.find((e) => e.diammHeightRatio === averageDiammeter);

        if (correctionFound) {
          higherReference[i] = correctionFound;
          lowerReference[i] = correctionFound;
        } else {
          let lowerIndex: number | undefined;
          let higherIndex: number | undefined;

          for (let j = 0; j < correctionFactorArr.length; j++) {
            if (correctionFactorArr[j].diammHeightRatio < averageDiammeter) {
              lowerIndex = j;
            } else if (correctionFactorArr[j].diammHeightRatio > averageDiammeter) {
              higherIndex = j;
              break;
            }
          }

          const higherReferenceArr = higherIndex !== undefined ? correctionFactorArr[higherIndex] : null;
          higherReference[i] = higherReferenceArr;
          const lowerReferenceArr = lowerIndex !== undefined ? correctionFactorArr[lowerIndex] : null;
          lowerReference[i] = lowerReferenceArr;
        }
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

      for (let i = 0; i < samples.length; i++) {
        const ageDifference = (higherReference[i].age * 60) - (lowerReference[i].age * 60);
        const toleranceDifference = higherReference[i].tolerance - lowerReference[i].tolerance;

        const averageDiammeter = (samples[i].diammeter1 + samples[i].diammeter2) / 2;
        averageDiammeters[i] = averageDiammeter;

        const ageInput = (higherReference[i].age * 60) - samples[i].age;
        const ageRatio = ageDifference / ageInput;
        const toleranceValue = (ageRatio * higherReference[i].tolerance) / toleranceDifference;
        const toleranceRatio = toleranceValue / higherReference[i].tolerance;

        tolerances[i] = toleranceRatio;

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

  calculateCorrectionFactor(maximumStrength, samples, correctionRefs) {
    try {
      this.logger.log('calculate correction factor on calc.rc.service.ts > [body]');

      let correctionFactor = new Array(samples.length).fill(null);

      for (let i = 0; i < samples.length; i++) {
        const averageDiammeter = (samples[i].diammeter1 + samples[i].diammeter2) / 2;

        if (averageDiammeter >= 2.06) {
          throw new BadRequestException('Diameter ratio needs to be smaller than 2.06');
        } else if (averageDiammeter <= 1.94) {
          const correctionFound = correctionFactorArr.find((e) => e.diammHeightRatio === averageDiammeter);
          if (!correctionFound) {
            // Interpolação
            const diammterRatioDifference =
              correctionRefs.higherReference[i].diammHeightRatio - correctionRefs.lowerReference[i].diammHeightRatio;
            const correctionFactorDifference =
              correctionRefs.higherReference[i].correctionFactor - correctionRefs.lowerReference[i].correctionFactor;

            const value = correctionRefs.higherReference[i].diammHeightRatio - averageDiammeter;
            const ratio = diammterRatioDifference / value;
            const correctionValue = (ratio * correctionRefs.higherReference[i].correctionFactor) / correctionFactorDifference;
            const correctionRatio = correctionValue / correctionRefs.higherReference[i].correctionFactor;

            correctionFactor[i] = correctionRatio;
          } else if (averageDiammeter <= 1.94 && averageDiammeter >= 2.06) {
            correctionFactor[i] = maximumStrength;
          }
        }

        correctionFactor[i] = (4 * maximumStrength) / (Math.PI * averageDiammeter);
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
