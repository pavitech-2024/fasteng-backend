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

      const ageDifference  = (higherReference.age * 60) - (lowerReference.age * 60);
      const ageInput = (higherReference.age * 60) - age;
      const ageRatio = ageDifference  / ageInput;

      const toleranceDifference  = (higherReference.tolerance * 60) - (lowerReference.tolerance * 60);

      const toleranceValue  = (ageRatio * (higherReference.tolerance * 60)) / toleranceDifference ;

      const toleranceRatio = toleranceValue / (higherReference.tolerance * 60);

      let isPermited;

      if (toleranceRatio >= tolerance - 10 || toleranceRatio <= tolerance + 10 ) {
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
