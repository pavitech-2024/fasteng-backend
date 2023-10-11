import { Injectable, Logger } from "@nestjs/common";
import { Calc_SofteningPoint_Dto, Calc_SofteningPoint_Out } from "../dto/calc-softeningPoint.dto";

@Injectable()
export class Calc_SofteningPoint_Service {
  private logger = new Logger(Calc_SofteningPoint_Service.name);

  async calculateSofteningPoint({ softeningPoint, generalData }: Calc_SofteningPoint_Dto): Promise<{ success: boolean; result: Calc_SofteningPoint_Out }> {
    try {
      this.logger.log('calculate softening point on calc.softeningPoint.service.ts > [body]');

      const result = {
        softeningPoint: 0,
        alerts: []
      }

      return {
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }
}