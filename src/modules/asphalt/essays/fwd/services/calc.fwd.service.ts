import { Injectable, Logger } from '@nestjs/common';
import { FwdRepository } from '../repository';
import { Calc_Fwd_Dto, Calc_Fwd_Out } from '../dto/calc-fwd.dto';

@Injectable()
export class Calc_Fwd_Service {
  private logger = new Logger(Calc_Fwd_Service.name);

  constructor(private readonly fwdRepository: FwdRepository) {}

  async calculateFwd({ fwdStep3 }: Calc_Fwd_Dto): Promise<{ success: boolean; result: Calc_Fwd_Out }> {
    try {
    } catch (error) {
      return {
        success: false,
        result: null,
      };
    }
  }
}
