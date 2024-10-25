import { Injectable, Logger } from "@nestjs/common";
import { ConcreteRCRepository } from "../respository";
import { MaterialsRepository } from "modules/concrete/materials/repository";
import { ConcreteRcInterpolationDto } from "../dto/calc.interpolation.dto";

@Injectable()
export class Calc_Interpolation_CONCRETERC_Service {
  private logger = new Logger(Calc_Interpolation_CONCRETERC_Service.name);

  constructor(private readonly rcRepository: ConcreteRCRepository, private readonly materialRepository: MaterialsRepository) {}

  async calculateConcreteRcInterpolation({ age, tolerance, lowerReference, higherReference }: ConcreteRcInterpolationDto) {
    try {
      this.logger.log('calculate rc interpolation on calc.rc.interpolation.service.ts > [body]');

      let result = {
        resultTolerance: 0,
        isPermited: false
      };

      const ageDifference  = higherReference.age - lowerReference.age;
      const ageInHours = age / 60;
      const ageInput = higherReference.age - ageInHours;
      const ageRatio = ageDifference  / ageInput;

      const toleranceDifference  = higherReference.tolerance - lowerReference.tolerance;

      const toleranceValue  = (ageRatio * higherReference.tolerance) / toleranceDifference;

      const toleranceRatio = toleranceValue / higherReference.tolerance;

      let isPermited;

      if (toleranceRatio >= (tolerance / 60) - 10 || toleranceRatio <= tolerance + 10 ) {
        isPermited = true;
      } else {
        isPermited = false;
      }

      result.resultTolerance = toleranceRatio;
      result.isPermited = isPermited;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
