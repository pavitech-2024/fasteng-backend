import { Injectable, Logger } from '@nestjs/common';
import { GranulometryRepository } from '../repository';
import { GranulometryInitDto } from '../dto/granulometry-init.dto';
import { SamplesRepository } from '../../../samples/repository';
import { AlreadyExists, NotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_GRANULOMETRY_Service {
  private logger = new Logger(GeneralData_GRANULOMETRY_Service.name);

  constructor(private readonly granulometryRepository: GranulometryRepository, private readonly sampleRepository: SamplesRepository) {}

  async verifyInitGranulometry({ name, sample }: GranulometryInitDto) {
    try {
      this.logger.log('verify init granulometry on general-data.granulometry.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const sampleExists = await this.sampleRepository.findOne({ _id: sample._id });

      // se não existir, retorna erro
      if (!sampleExists) throw new NotFound('Chosen sample of GRANULOMETRY');

      // verificar se existe uma granulometry com mesmo nome e sampleId no banco de dados
      const granulometryExists = await this.granulometryRepository.findOne({ generalData: { name, sample: { _id: sample._id } } });

      // se existir, retorna erro
      if (granulometryExists) throw new AlreadyExists(`GRANULOMETRY with name "${name} from user "${sample.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
