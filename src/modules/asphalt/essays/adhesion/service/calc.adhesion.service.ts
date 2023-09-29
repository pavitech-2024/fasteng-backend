import { Injectable, Logger } from "@nestjs/common";
import { Calc_Adhesion_Dto, Calc_Adhesion_Out } from "../dto/calc.adhesion.dto";

@Injectable()
export class Calc_Adhesion_Service {
  private logger = new Logger(Calc_Adhesion_Service.name);

  async calculateAdhesion({ adhesion }: Calc_Adhesion_Dto): Promise<{ success: boolean; result: Calc_Adhesion_Out }> {
    try {
      this.logger.log('calculate adhesion on calc.adhesion.service.ts > [body]');

      const result = {
        filmDisplacement: adhesion.filmDisplacement,
      };

      return {
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }
}