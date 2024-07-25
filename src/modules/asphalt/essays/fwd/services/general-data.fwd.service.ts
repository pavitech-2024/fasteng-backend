import { Injectable, Logger } from '@nestjs/common';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { FwdRepository } from '../repository';
import { FwdInitDto } from '../dto/init-fwd.dto';

@Injectable()
export class GeneralData_Fwd_Service {
  private logger = new Logger(GeneralData_Fwd_Service.name);

  constructor(private readonly fwdRepository: FwdRepository) {}

  async verifyInitFwd({ name }: FwdInitDto) {
    try {
      this.logger.log('verify init fwd on general-data.fwd.service.ts > [body]');

      // verificar se existe uma fwd com mesmo nome no banco de dados
      const fwdExists = await this.fwdRepository.findOne({
        generalData: { name },
      });

      // se existir, retorna erro
      if (fwdExists) throw new AlreadyExists(`IGG with name "${name}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
