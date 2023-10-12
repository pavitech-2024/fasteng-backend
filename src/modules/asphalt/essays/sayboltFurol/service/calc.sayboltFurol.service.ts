import { Injectable, Logger } from "@nestjs/common";
import { Calc_SayboltFurol_Dto, Calc_SayboltFurol_Out } from "../dto/calc-sayboltFurol.dto";

@Injectable()
export class Calc_SayboltFurol_Service {
  private logger = new Logger(Calc_SayboltFurol_Service.name);

  async calculateSayboltFurol({ sayboltFurol, generalData }: Calc_SayboltFurol_Dto): Promise<{ success: boolean; result: Calc_SayboltFurol_Out }> {
    try {
      this.logger.log('calculate saybolt-furol on calc.sayboltFurol.service.ts > [body]');

      const result: Calc_SayboltFurol_Out = {
        graph: "",
        machiningTemperatureRange: {
          higher: 0,
          lower: 0,
          average: 0
        },
        compressionTemperatureRange: {
          higher: 0,
          lower: 0,
          average: 0
        },
        aggregateTemperatureRange: {
          higher: 0,
          lower: 0,
          average: 0
        },
        curvePoints: [[],[],[],[],[],[]],
        equation: {
          aIndex: 0,
          bIndex: 0
        }
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