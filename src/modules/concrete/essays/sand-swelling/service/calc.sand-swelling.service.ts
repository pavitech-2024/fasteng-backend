import { Injectable, Logger } from "@nestjs/common";
import { SandSwellingRepository } from "../repository";
import { MaterialsRepository } from "modules/concrete/materials/repository";
import { Calc_SandSwelling_Dto, Calc_SandSwelling_Out } from "../dto/calc.sand-swelling.dto";
import { CalculateUnitMassDto } from "../dto/calc-unit-mass.dto";


@Injectable()
export class Calc_SandSwelling_Service {
  private logger = new Logger(Calc_SandSwelling_Service.name);

  constructor(
    private readonly sandSwellingRepository: SandSwellingRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async calculateSandSwelling(body: Calc_SandSwelling_Dto): Promise<{ success: boolean; result: Calc_SandSwelling_Out}> {
    try {
      this.logger.log('calculate sand-swelling on calc.cbr.service.ts > [body]');

      return {
        success: true,
        result: {},
      };
    } catch (error) {
      throw error;
    }
  }

  async calculateUnitMass(body: CalculateUnitMassDto): Promise<{success: boolean; result: Calc_SandSwelling_Out }> {
    try {
      this.logger.log('calculate sand-swelling on calc.cbr.service.ts > [body]');

      const array = body;

      const dd = array.forEach(element => {
        
      });


      // data.forEach( weight => {
      //   if(weight !== null) return unitMasses.push(( weight - containerWeight) / containerVolume);
      //   else return unitMasses.push(null);
      // })

      return {
        success: true,
        result: {},
      };
    } catch (error) {
      throw error;
    }
  }
}