import { Injectable } from '@nestjs/common';
import { GeneralData_SandSwelling_Service } from './general-data.sand-swelling.service';
import { SandSwellingRepository } from '../repository';
import { Calc_SandSwelling_Service } from './calc.sand-swelling.service';
import { SandSwellingInitDto } from '../dto/sand-swelling-init.dto';
import { Calc_SandSwelling_Dto } from '../dto/calc.sand-swelling.dto';
import { CalculateUnitMassDto } from '../dto/calc-unit-mass.dto';
import { Calc_MoistureContent_Dto } from '../dto/calc-moisture-content.dto';

@Injectable()
export class SandSwellingService {
  constructor(
    private readonly generalData_Service: GeneralData_SandSwelling_Service,
    private readonly calc_Service: Calc_SandSwelling_Service,
    private readonly sandSwellingRepository: SandSwellingRepository
  ){}

  async verifyInitSandSwelling(body: SandSwellingInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitSandSwelling(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  // async calculateUnitMass(body: CalculateUnitMassDto) {
  //   try {
  //     return await this.calc_Service.calculateUnitMass(body);
  //   } catch (error) {
  //     const { status, name, message } = error;

  //     return { success: false, error: { status, message, name } };
  //   }
  // }

  // async calculateMoistureContent(body: any) {
  //   try {
  //     return await this.calc_Service.calculateMoistureContent(body);
  //   } catch (error) {
  //     const { status, name, message } = error;

  //     return { success: false, error: { status, message, name } };
  //   }
  // }

  async calculateSandSwelling(body: Calc_SandSwelling_Dto) {
    try {
      return await this.calc_Service.calculateSandSwelling(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
