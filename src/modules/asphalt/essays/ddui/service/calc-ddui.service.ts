import { Injectable, Logger } from "@nestjs/common";
import { Calc_Ddui_Dto, Calc_Ddui_Out } from "../dto/calc-ddui.dto";

@Injectable()
export class Calc_Ddui_Service {
  private logger = new Logger(Calc_Ddui_Service.name);

  private confirmResults(data: any[], pressConst: number) {
    const conditionedData = [];
    const unconditionedData = [];
    data.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key === "condicionamento") {
          if (row[key] === true) {
            conditionedData.push(row);
          } else {
            unconditionedData.push(row);
          }
        }
      });
    });

    const {
      rtsMpa: everyRtsMpa,
      rtsKgf: everyRtsKgf,
      average: everyAverage,
    } = this.calculateRtsValues(data, pressConst);

    const {
      rtsMpa: conditionedRtsMpa,
      rtsKgf: conditionedRtsKgf,
      average: conditionedAverage,
    } = this.calculateRtsValues(conditionedData, pressConst);


    const {
      rtsMpa: unconditionedRtsMpa,
      rtsKgf: unconditionedRtsKgf,
      average: unconditionedAverage,
    } = this.calculateRtsValues(unconditionedData, pressConst);

    const rrt = conditionedAverage / unconditionedAverage;

    return {
      everyRtsMpa,
      everyRtsKgf,
      conditionedAverage,
      unconditionedAverage,
      rrt,
    };
  }

  async calculateDdui({ dduiStep2, dduiStep3, generalData }: Calc_Ddui_Dto): Promise<{ success: boolean; result: Calc_Ddui_Out }> {
    try {
      this.logger.log('calculate sand equivalent on calc.ddui.service.ts > [body]');

      // Coloque aqui o restante do seu código para processar generalData...

      // Chamar a função confirmResults diretamente
      const result = this.confirmResults(dduiStep3.ddui_data, dduiStep2.pressConstant);

      // Continuar com o resto do seu código...

      return {
        success: true,
        result: result, // Inclua o resultado calculado
      };
    } catch (error) {
      throw error;
    }

  }

  private calculateRtsValues(data: any[], pressConst: number) {
    const rtsMpa: number[] = [];
    const rtsKgf: number[] = [];

    data.forEach((row) => {
      let sumDiameter = 0;
      let nDiameter = 0;
      let sumHeight = 0;
      let nHeight = 0;

      Object.keys(row).forEach((key) => {
        if (String(key)[0] === 'd') {
          if (row[key] !== null) {
            sumDiameter += row[key];
            nDiameter++;
          }
        }
        if (String(key)[0] === 'h') {
          if (row[key] !== null) {
            sumHeight += row[key];
            nHeight++;
          }
        }
      });

      const averageDiameter = sumDiameter / nDiameter;
      const averageHeight = sumHeight / nHeight;
      const rtMpa = ((2 * pressConst * row["pressReading"]) / (Math.PI * (averageDiameter / 10) * (averageHeight / 10)) / 10);
      const rtKgf = rtMpa * 10;
      rtsMpa.push(rtMpa);
      rtsKgf.push(rtKgf);
    });

    let totalRt = 0;

    for (const value of rtsMpa) {
      totalRt += value;
    }

    const average = totalRt / rtsMpa.length;

    return { rtsMpa, rtsKgf, average };
  }
}
