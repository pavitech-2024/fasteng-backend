import { Injectable, Logger } from "@nestjs/common";
import { Calc_Ddui_Dto, Calc_Ddui_Out } from "../dto/calc-ddui.dto";

@Injectable()
export class Calc_Ddui_Service {
  private logger = new Logger(Calc_Ddui_Service.name);

  async calculateDdui({ ddui, generalData }: Calc_Ddui_Dto): Promise<{ success: boolean; result: any }> {
    try {
      this.logger.log('calculate sand equivalent on calc.ddui.service.ts > [body]');

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