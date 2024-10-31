import { Injectable, Logger } from '@nestjs/common';
import { Calc_Concrete_RT_Dto, Calc_Concrete_RT_Out } from '../dto/calc.rt.dto';
import { ConcreteRtInterpolationDto } from '../dto/concrete-rt-interpolation.dto';
import { Calc_CONCRETERC_Dto } from '../../rc/dto/calc.rc.dto';

@Injectable()
export class Calc_ConcreteRt_Service {
  private logger = new Logger(Calc_ConcreteRt_Service.name);

  async calculateConcreteRtInterpolation({
    lowerReference,
    higherReference,
    age,
    tolerance,
  }: ConcreteRtInterpolationDto) {
    try {
      this.logger.log('calculate rt interpolation on calc.rc.interpolation.service.ts > [body]');

      let result = {
        data: 0,
        isPermited: true,
      };

      const higherReferenceArr = Object.values(higherReference).map((e) => e);
      const lowerReferenceArr = Object.values(lowerReference).map((e) => e);

      const ruptureAgeRef = higherReferenceArr[0] - lowerReferenceArr[0];
      const toleranceRef = higherReferenceArr[1] - lowerReferenceArr[1];

      const ageInput = higherReferenceArr[0] - age;
      const ageRatio = ruptureAgeRef / ageInput;

      const toleranceValue = (ageRatio * higherReferenceArr[1]) / toleranceRef;

      const toleranceRatio = toleranceValue / higherReferenceArr[1];

      // Condicional: apenas se o usuário inserir valor de tolerância no input do step2;

      // Verificação da margem de erro (10+-);
      if (tolerance) {
        if (toleranceRatio >= tolerance - 10 || toleranceRatio <= tolerance + 10) {
          result.isPermited = true;
        } else {
          result.isPermited = false;
        }
      }

      result.data = toleranceValue;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async calculateConcreteRt({
    step3Data,
  }: Calc_Concrete_RT_Dto): Promise<{ success: boolean; result: any }> {
    try {
      this.logger.log('calculate rt on calc.rc.service.ts > [body]');

      const { supportsDistance, appliedCharge } = step3Data;

      const flexualTensileStrength = this.calculateFlexualTensileStrength(
        appliedCharge,
        supportsDistance,
      );

      const compressionResistance = this.calculateCompressionResistance(appliedCharge);

      const result = {
        flexualTensileStrength,
        compressionResistance,
      };

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
