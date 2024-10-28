import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from 'modules/asphalt/materials/repository';
import { getSieveValue } from 'modules/soils/util/sieves';
import { Calc_CONCRETERC_Dto, Calc_CONCRETERC_Out } from '../dto/calc.rc.dto';
import { ConcreteRCRepository } from '../respository';
import { ConcreteRcInterpolationDto } from '../dto/calc.interpolation.dto';

type limit = { value: number; index: number };

interface curve_point {
  0: number;
  1: number;
}

@Injectable()
export class Calc_CONCRETERC_Service {
  private logger = new Logger(Calc_CONCRETERC_Service.name);

  constructor(
    private readonly rcRepository: ConcreteRCRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async calculateConcreteRcInterpolation({
    age_diammHeightRatio,
    tolerance_strenght,
    lowerReference,
    higherReference,
    type,
  }: ConcreteRcInterpolationDto) {
    try {
      this.logger.log('calculate rc interpolation on calc.rc.interpolation.service.ts > [body]');

      let isPermited;

      let result = {
        data: 0,
        isPermited: null,
      };

      const higherReferenceArr = Object.values(higherReference).map((e) => e);
      const lowerReferenceArr = Object.values(lowerReference).map((e) => e);

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
          const tolerance_strenghtHours = tolerance_strenght / 60;
          const errorMarginHours = 10 / 60;
          if (
            toleranceRatio >= tolerance_strenghtHours - errorMarginHours ||
            toleranceRatio <= tolerance_strenghtHours + errorMarginHours
          ) {
            isPermited = true;
          } else {
            isPermited = false;
          }
        }

        result.data = toleranceRatio;
        result.isPermited = isPermited;
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
      this.logger.log('calculate rc on calc.rc.service.ts > [body]');

      const { diammeter1, diammeter2, correctionFactor } = step2Data;

      let result: {
        finalCorrectionFactor: number;
      } = {
        finalCorrectionFactor: 0,
      };

      const maxStrenght = 4 * correctionFactor;
      const averageDiammeter = diammeter1 + diammeter2 / 2;
      const value = Math.PI * averageDiammeter;
      const final = maxStrenght / value;

      result.finalCorrectionFactor = final;

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
