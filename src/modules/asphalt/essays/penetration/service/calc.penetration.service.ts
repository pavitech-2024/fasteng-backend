import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from '../../../materials/repository';
import { Calc_Penetration_Dto, Calc_Penetration_Out } from "../dto/calc.penetration.dto";
import { PenetrationRepository } from "../repository";

@Injectable()
export class Calc_Penetration_Service {
  private logger = new Logger(Calc_Penetration_Service.name);

  constructor(private readonly penetrationRepository: PenetrationRepository, private readonly materialRepository: MaterialsRepository) {}

  async calculatePenetration({ penetrationCalc }: Calc_Penetration_Dto): Promise<{ success: boolean; result: Calc_Penetration_Out }> {
    try {
      this.logger.log('calculate penetration on calc.penetration.service.ts > [body]');

      

      return {
        success: true,
        result: {
          penetration: 0,
          cap: "",
          alerts: "",
          indexOfSusceptibility: 0
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
