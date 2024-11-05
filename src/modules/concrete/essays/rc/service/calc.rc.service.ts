import { Injectable, Logger } from '@nestjs/common';
import { Calc_CONCRETERC_Dto, Calc_CONCRETERC_Out } from '../dto/calc.rc.dto';
import { ConcreteRcInterpolationDto } from '../dto/calc.interpolation.dto';

@Injectable()
export class Calc_CONCRETERC_Service {
  private logger = new Logger(Calc_CONCRETERC_Service.name);

  constructor(
  ) {}

  async calculateConcreteRcInterpolation({
    age_diammHeightRatio,
    tolerance_strenght,
    lowerReference,
    higherReference,
    type,
  }: ConcreteRcInterpolationDto) {
    try {
      this.logger.log('calculate rc interpolation on calc.rc.interpolation.service.ts > [body]')

      let result = {
        data: 0,
        isPermited: true,
      };

      const higherReferenceArr = Object.values(higherReference).map((e) => e);
      const lowerReferenceArr = Object.values(lowerReference).map((e) => e);


      // hours
      const age_diammHeight_Difference = higherReferenceArr[0] - lowerReferenceArr[0];
      const tolerance_correctionFactor_Diff = higherReferenceArr[1] - lowerReferenceArr[1];

      if (type === 'tolerance') {
        const ageInHours = age_diammHeightRatio / 60;
        const ageInput = higherReferenceArr[0] - ageInHours;
        const ageRatio = age_diammHeight_Difference / ageInput;

        const toleranceValue = (ageRatio * higherReferenceArr[1]) / tolerance_correctionFactor_Diff;

        const toleranceRatio = toleranceValue / higherReferenceArr[1];

        // Condicional: apenas se o usuário inserir valor de tolerância no input do step2;

        // Verificação da margem de erro (10+-);
        if (tolerance_strenght) {
          const toleranceRatioMinutes = toleranceRatio * 60;
          // Todo: Revisar a margem de erro para saber se ele está considerando como minutos ou horas;
          if (
            toleranceRatioMinutes >= tolerance_strenght - 10 &&
            toleranceRatioMinutes <= tolerance_strenght + 10
          ) {
            result.isPermited = true;
          } else {
            result.isPermited = false;
          }
        }

        result.data = toleranceRatio;
      } else if (type === 'correctionFactor') {
        const strenghtDiference = higherReferenceArr[0] - age_diammHeightRatio;
        const strenghtRatio = age_diammHeight_Difference / strenghtDiference;

        const correctionFactorValue = (strenghtRatio * higherReferenceArr[1]) / tolerance_correctionFactor_Diff;
        const correctionFactorRatio = correctionFactorValue / higherReferenceArr[1];

        result.data = correctionFactorRatio;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async calculateRc({ step2Data }: Calc_CONCRETERC_Dto): Promise<{ success: boolean; result: Calc_CONCRETERC_Out }> {
    try {
      this.logger.log('calculate rc on calc.rc.service.ts > [body]')

      const { diammeter1, diammeter2, correctionFactor } = step2Data;

      const averageDiammeter = (diammeter1 + diammeter2) / 2;
      const maxStrenght = 4 * correctionFactor.data;
      const finalCorrectionFactor = maxStrenght / (Math.PI * averageDiammeter);

      const result = {
        finalCorrectionFactor
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
}
