import { Injectable, Logger } from '@nestjs/common';
import { AlreadyExists, NotFound } from '../../../../../utils/exceptions';
import { SamplesRepository } from '../../../samples/repository';
import { HrbRepository } from '../repository';
import { HrbInitDto } from '../dto/hrb-init.dto';

@Injectable()
export class GeneralData_HRB_Service {
  private logger = new Logger(GeneralData_HRB_Service.name);

  constructor(private readonly hrbRepository: HrbRepository, private readonly sampleRepository: SamplesRepository) {}

  async verifyInitHrb({ name, sample }: HrbInitDto) {
    try {
      this.logger.log('verify init hrb on general-data.hrb.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const sampleExists = await this.sampleRepository.findOne({ _id: sample._id });

      // se não existir, retorna erro
      if (!sampleExists) throw new NotFound('Chosen sample of HRB');

      // verificar se existe uma hrb com mesmo nome e sampleId no banco de dados
      const hrbExists = await this.hrbRepository.findOne({ generalData: { name, sample: { _id: sample._id } } });

      // se existir, retorna erro
      if (hrbExists) throw new AlreadyExists(`HRB with name "${name} from user "${sample.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
