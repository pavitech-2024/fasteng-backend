import { Injectable, Logger } from "@nestjs/common";
import { Calc_Rtfo_Dto, Calc_Rtfo_Out } from "../dto/calc-rtfo.dto";

@Injectable()
export class Calc_Rtfo_Service {
  private logger = new Logger(Calc_Rtfo_Service.name);

  async calculateRtfo({ rtfo, generalData }: Calc_Rtfo_Dto): Promise<{ success: boolean; result: Calc_Rtfo_Out }> {
    try {
      this.logger.log('calculate rtfo on calc.rtfo.service.ts > [body]');

      const resultList = rtfo.samples.map(sample => ({
        initialSetWeight: sample.sampleWeight,
        weightLoss: ((sample.sampleWeight - sample.finalSampleWeight) / sample.sampleWeight) * 100,
      }));

      const weightLossAverage = resultList.reduce((total, sample) => total + sample.weightLoss, 0) / resultList.length;

      const { material } = generalData;

      const alerts: string[] = [];

      if (
        (material.description.classification_CAP === 'CAP 30/45' || material.description.classification_CAP === 'CAP 50/70' || material.description.classification_CAP === 'CAP 85/100' || material.description.classification_CAP === 'CAP 150/200') &&
        Math.abs(weightLossAverage) > 0.50
      ) {
        alerts.push(`A variação de massa para o ${material.description.classification_CAP} não deve ser superior a 0,5%.`);
      }
      if (
        (material.description.classification_AMP === 'AMP 50/65' || material.description.classification_AMP=== 'AMP 55/75' || material.description.classification_AMP === 'AMP 60/85' || material.description.classification_AMP === 'AMP 65/90') &&
        Math.abs(weightLossAverage) > 1
      ) {
        alerts.push(`A variação de massa para o ${material.description.classification_AMP} não deve ser superior a 1%.`);
      }

      // Defina o resultado final.
      const result: Calc_Rtfo_Out = {
        list: resultList,
        weightLossAverage,
        alerts,
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