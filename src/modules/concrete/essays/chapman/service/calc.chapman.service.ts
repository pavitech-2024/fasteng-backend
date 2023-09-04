import { Injectable, Logger } from '@nestjs/common';
import { Calc_CHAPMAN_dto } from '../dto/calc.chapman.dto';

@Injectable()
export class Calc_CHAPMAN_Service {
  private logger = new Logger(Calc_CHAPMAN_Service.name);

  async calculateChapman({ step2Data }: Calc_CHAPMAN_dto) {
    try {
      this.logger.log('calculate chapman on calc.chapman.service.ts > [body]');

      const result = 500 / (step2Data.displaced_volume - 200);

      return {
        success: true,
        result: {
          m_e: result,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
