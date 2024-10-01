import { Injectable, Logger } from "@nestjs/common";
import { Calc_Concrete_RT_Dto, Calc_Concrete_RT_Out } from "../dto/calc.rt.dto";


@Injectable()
export class Calc_ConcreteRt_Service {
  private logger = new Logger(Calc_ConcreteRt_Service.name);

  private confirmResults(data: any[], pressConstant: number) {
    const {
      rtsMpa: everyRtsMpa,
      rtsKgf: everyRtsKgf,
      average: average,
    } = this.calculateRtsValues(data, Number(pressConstant));

    return { everyRtsMpa, everyRtsKgf, average };
  }

  async calculateConcreteRt({ step2Data, step3Data }: Calc_Concrete_RT_Dto): Promise<{ success: boolean; result: Calc_Concrete_RT_Out }> {
    try {
      this.logger.log('calculate concreteRt on calc.concreteRt.service.ts > [body]')

      const result = this.confirmResults(step3Data.data, step2Data.pressConstant);

      return {
        success: true,
        result: result,
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

      const rtMpa: number =
        (2 * pressConst * row['pressReading']) / (Math.PI * (averageDiameter / 10) * (averageHeight / 10)) / 10;
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