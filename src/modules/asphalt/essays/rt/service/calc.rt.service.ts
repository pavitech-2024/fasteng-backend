import { Injectable, Logger } from '@nestjs/common';
import { Calc_Rt_Dto } from '../dto/calc-rt.dto';

@Injectable()
export class Calc_Rt_Service {
  private logger = new Logger(Calc_Rt_Service.name);

  async calculateRt({ rt, generalData }: Calc_Rt_Dto): Promise<{ success: boolean; result: any }> {
    try {
      this.logger.log('calculate sand equivalent on calc.rt.service.ts > [body]');

      // const result = {
      //   laboratoryName: "",
      //   responsible: "",
      //   selectedDosage: "",
      //   dnitRange: "",
      //   sampleOrigin: "",
      //   sampleVoidVolume: "",
      //   pressSpecification: "",
      //   pressConstant: 0,
      //   experimentDate: "",
      //   minRrt: 0,
      //   data: [{
      //     sampleName: "",
      //     condicionamento: "",
      //     d1: 0,
      //     d2: 0,
      //     d3: 0,
      //     h1: 0,
      //     h2: 0,
      //     h3: 0,
      //     pressReading: 0,
      //   }]
      // }

      return {
        success: true,
        result: {},
      };
    } catch (error) {
      throw error;
    }
  }
}
