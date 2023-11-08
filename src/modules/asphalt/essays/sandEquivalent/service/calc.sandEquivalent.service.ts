import { Injectable, Logger } from "@nestjs/common";
import { Calc_SandEquivalent_Dto, Calc_SandEquivalent_Out } from "../dto/calc-sandEquivalent.dto";

@Injectable()
export class Calc_SandEquivalent_Service {
  private logger = new Logger(Calc_SandEquivalent_Service.name);

  async calculateSandEquivalent({ sandEquivalent, generalData }: Calc_SandEquivalent_Dto): Promise<{ success: boolean; result: Calc_SandEquivalent_Out }> {
    try {
      this.logger.log('calculate sand equivalent on calc.sandEquivalent.service.ts > [body]');

      const { sandLevel, clayLevel } = sandEquivalent;

      const result = {
        sandEquivalent: 0,
        alerts: []
      }

      result.sandEquivalent = Math.abs((sandLevel/clayLevel) * 100);

      if(result.sandEquivalent < 55){
        result.alerts.push("Alerta: de acordo com a especificação DNIT 031/2006, o equivalente areia deve ser no mínimo de 55 %");
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