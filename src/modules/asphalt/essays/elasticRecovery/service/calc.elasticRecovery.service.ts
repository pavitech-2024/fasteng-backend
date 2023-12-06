import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from '../../../materials/repository';
import { ElasticRecoveryRepository } from "../repository";
import { Calc_ElasticRecovery_Dto, Calc_ElasticRecovery_Out } from "../dto/calc-elasticRecovery.dto";

@Injectable()
export class Calc_ElasticRecovery_Service {
  private logger = new Logger(Calc_ElasticRecovery_Service.name);

  constructor(private readonly elasticRecoveryRepository: ElasticRecoveryRepository, private readonly materialRepository: MaterialsRepository) { }

  async calculateElasticRecovery(calcElasticRecoveryDto: Calc_ElasticRecovery_Dto): Promise<{ success: boolean; result: Calc_ElasticRecovery_Out }> {
    try {
      this.logger.log('calculate elasticRecovery on calc.elasticRecovery.service.ts > [body]');

      const { lengths } = calcElasticRecoveryDto.elasticRecoveryCalc;

      const elasticRecovery = this.calculate(lengths);

      return {
        success: true,
        result: {
          elasticRecovery
        },
      };
    } catch (error) {
      throw error;
    }
  }

  private calculate(lengths: { id: number; stretching_lenght: number; juxtaposition_length: number; }[]): number {
    let sum = 0;

    for (let index = 0; index < lengths.length; index++) {

      let length = lengths[index];

      sum += (((length.stretching_lenght - length.juxtaposition_length) * 100) /
        length.stretching_lenght);
        
    }

    return Math.round( 100 * (sum / lengths.length)) / 100;
  }
}