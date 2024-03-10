import { Injectable, Logger } from '@nestjs/common';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { IggRepository } from '../repository';
import { IggInitDto } from '../dto/init-igg.dto';

@Injectable()
export class GeneralData_Igg_Service {
  private logger = new Logger(GeneralData_Igg_Service.name);

  constructor(private readonly iggRepository: IggRepository) {}

  async verifyInitIgg({ name }: IggInitDto) {
    try {
      this.logger.log('verify init igg on general-data.igg.service.ts > [body]');

      // verificar se existe uma igg com mesmo nome no banco de dados
      const iggExists = await this.iggRepository.findOne({
        generalData: { name },
      });

      // se existir, retorna erro
      if (iggExists) throw new AlreadyExists(`IGG with name "${name}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
