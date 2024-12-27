import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Calc_Concrete_RT_Dto, Calc_Concrete_RT_Out } from '../dto/calc.rt.dto';
import { ConcreteRtInterpolationDto } from '../dto/concrete-rt-interpolation.dto';
import { Calc_CONCRETERC_Dto } from '../../rc/dto/calc.rc.dto';
import { ruptureAge } from './referenceTables';

@Injectable()
export class Calc_ConcreteRt_Service {
  private logger = new Logger(Calc_ConcreteRt_Service.name);

  async calculateConcreteRt({
    step2Data,
  }: Calc_Concrete_RT_Dto): Promise<{ success: boolean; result: any }> {
    try {
      this.logger.log('calculate rt on calc.rc.service.ts > [body]');

      const samples = step2Data;

      const result = {
        tolerances: new Array(samples.length).fill(null),
        flexualTensileStrength: new Array(samples.length).fill(null),
        compressionResistance: new Array(samples.length).fill(null),
      };

      const toleranceRefs = this.findToleranceRefs(samples);

      result.flexualTensileStrength = this.calculateTolerance(samples, toleranceRefs);
      
      for (let i = 0; i < samples.length; i++) {
        result.flexualTensileStrength[i] = this.calculateFlexualTensileStrength(
          samples[i].appliedCharge,
          samples[i].supportsDistance
        )

        result.compressionResistance[i] = this.calculateCompressionResistance(samples[i].appliedCharge);
      }

      return {
        success: true,
        result,
      };
    } catch (error) {
      return {
        success: false,
        result: null,
      };
    }
  }

  findToleranceRefs(samples: Calc_Concrete_RT_Dto['step2Data']) {
    try {
      this.logger.log('find refs on calc.rc.service.ts > [body]');

      let higherReference = new Array(samples.length).fill(null);

      let lowerReference = new Array(samples.length).fill(null);

      for (let i = 0; i < samples.length; i++) {
        const toleranceFound = ruptureAge.find((e) => e.age * 60 === samples[i].age);

        if (toleranceFound) {
          higherReference[i] = toleranceFound;
          lowerReference[i] = toleranceFound;
        } else {
          let lowerIndex: number | undefined;
          let higherIndex: number | undefined;

          for (let j = 0; j < ruptureAge.length; j++) {
            if (ruptureAge[j].age * 60 < samples[i].age) {
              lowerIndex = j;
            } else if (ruptureAge[j].age * 60 > samples[i].age) {
              higherIndex = j;
              break;
            }
          }

          const higherReferenceArr = higherIndex !== undefined ? ruptureAge[higherIndex] : null;
          higherReference[i] = higherReferenceArr;
          const lowerReferenceArr = lowerIndex !== undefined ? ruptureAge[lowerIndex] : null;
          lowerReference[i] = lowerReferenceArr;
        }
      }

      return { higherReference, lowerReference };
    } catch (error) {
      throw error;
    }
  }

  calculateTolerance(samples, refs) {
    try {
      this.logger.log('calculate tolerance on calc.rc.service.ts > [body]'); 

      const { higherReference, lowerReference } = refs;

      let toleranceRatio;
      const tolerances = new Array(samples.length).fill(null);

      for (let i = 0; i < samples.length; i++) {
        if (refs.higherReference[i].age !== refs.lowerReference[i].age) {
          const ageDifference = higherReference[i].age * 60 - lowerReference[i].age * 60;
          const toleranceDifference = higherReference[i].tolerance - lowerReference[i].tolerance;

          const ageRatio = ageDifference / samples[i].age;

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

  verifyToleranceInput(samples, toleranceRatio) {
    try {
      this.logger.log('verify tolerance input on calc.rt.service.ts > [body]');

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

  calculateFlexualTensileStrength(appliedCharge: number, supportsDistance: number) {
    const chargeSupportsProduct = appliedCharge * supportsDistance;
    const finalProduct = 1.5 * chargeSupportsProduct;
    const flexualTensileStrength = finalProduct / 64000;

    return flexualTensileStrength;
  }

  calculateCompressionResistance(appliedCharge: number) {
    const compressionResistance = appliedCharge / 1600;

    return compressionResistance;
  }
}
