import { Injectable, Logger } from "@nestjs/common";
import { Calc_Adhesiveness_Dto, Calc_Adhesiveness_Out } from "../dto/calc.adhesiveness.dto";

@Injectable()
export class Calc_Adhesiveness_Service {
  private logger = new Logger(Calc_Adhesiveness_Service.name);

  async calculateAdhesiveness({ adhesiveness }: Calc_Adhesiveness_Dto): Promise<{ success: boolean; result: Calc_Adhesiveness_Out }> {
    try {
      this.logger.log('calculate adhesiveness on calc.adhesiveness.service.ts > [body]');

      const result = {
        filmDisplacement: adhesiveness.filmDisplacement,
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