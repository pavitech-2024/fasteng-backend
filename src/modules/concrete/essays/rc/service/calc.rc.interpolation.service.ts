import { Injectable, Logger } from "@nestjs/common";
import { ConcreteRCRepository } from "../respository";
import { MaterialsRepository } from "modules/concrete/materials/repository";
import { ConcreteRcInterpolationDto } from "../dto/calc.interpolation.dto";

@Injectable()
export class Calc_Interpolation_CONCRETERC_Service {
  private logger = new Logger(Calc_Interpolation_CONCRETERC_Service.name);

  constructor(private readonly rcRepository: ConcreteRCRepository, private readonly materialRepository: MaterialsRepository) {}

  async calculateConcreteRcInterpolation({ age, tolerance }: ConcreteRcInterpolationDto) {
    try {
      this.logger.log('calculate rc interpolation on calc.rc.interpolation.service.ts > [body]');

      


      return true;
    } catch (error) {
      throw error;
    }
  }
}
