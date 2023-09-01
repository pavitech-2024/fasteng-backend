import { Injectable } from '@nestjs/common';
import { GeneralData_SandIncrease_Service } from './general-data.sand-increase.service';
import { Calc_SandIncrease_Service } from './calc.sand-increase.service';
import { SandIncreaseRepository } from '../repository';
import { SandIncreaseInitDto } from '../dto/sand-increase-init.dto';
import { Calc_SandIncrease_Dto } from '../dto/calc.sand-increase.dto';

@Injectable()
export class SandIncreaseService {
  constructor(
    private readonly generalData_Service: GeneralData_SandIncrease_Service,
    private readonly calc_Service: Calc_SandIncrease_Service,
    private readonly sandIncreaseRepository: SandIncreaseRepository
  ){}

  async verifyInitSandIncrease(body: SandIncreaseInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitSandIncrease(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateSandIncrease(body: Calc_SandIncrease_Dto) {
    try {
      return await this.calc_Service.calculateSandIncrease(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
