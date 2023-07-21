import { Injectable, Logger } from '@nestjs/common';
import { SucsRepository } from '../repository';
import { SucsInitDto } from '../dto/sucs-init.dto';
import { SamplesRepository } from '../../../samples/repository';
import { AlreadyExists, NotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_SUCS_Service {
  private logger = new Logger(GeneralData_SUCS_Service.name);

  constructor(private readonly sucsRepository: SucsRepository, private readonly sampleRepository: SamplesRepository) {}

  async verifyInitSucs({ name, sample }: SucsInitDto) {
    try {
      this.logger.log('verify init sucs on general-data.sucs.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const sampleExists = await this.sampleRepository.findOne({ _id: sample._id });

      // se não existir, retorna erro
      if (!sampleExists) throw new NotFound('Chosen sample of SUCS');

      // verificar se existe uma sucs com mesmo nome e sampleId no banco de dados
      const sucsExists = await this.sucsRepository.findOne({ generalData: { name, sample: { _id: sample._id } } });

      // se existir, retorna erro
      if (sucsExists) throw new AlreadyExists(`SUCS with name "${name} from user "${sample.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
