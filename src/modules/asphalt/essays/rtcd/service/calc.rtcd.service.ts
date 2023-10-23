import { Injectable, Logger } from '@nestjs/common';
import { Calc_Rtcd_Dto, Calc_Rtcd_Out } from '../dto/calc-rtcd.dto';

@Injectable()
export class Calc_Rtcd_Service {
  private logger = new Logger(Calc_Rtcd_Service.name);

  async calculateRtcd({ rtcd, generalData }: Calc_Rtcd_Dto): Promise<{ success: boolean; result: any }> {
    try {
      this.logger.log('calculate resistence to traction by diametrical compression on calc.rtcd.service.ts > [body]');
      const { data } = rtcd;
      console.log(data);
      // const diametersArray = [d1, d2, d3];
      // const averageDiameter = diametersArray.reduce((sum, value) => (sum += value)) / diametersArray.length;
      // const averageHeight = heightsArray.reduce((sum, value) => sum += value) / heightsArray.length;
      // const

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
      //   data: [{
      //     sampleName: "",
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
