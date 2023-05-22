import { Injectable, Logger } from '@nestjs/common';
import { CbrRepository } from '../repository';
import { CbrInitDto } from '../dto/cbr-init.dto';
import { SamplesRepository } from '../../../samples/repository';
import { AlreadyExists, NotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_CBR_Service {
  private logger = new Logger(GeneralData_CBR_Service.name);

  constructor(private readonly cbrRepository: CbrRepository, private readonly sampleRepository: SamplesRepository) {}

  async verifyInitCbr({ name, sample }: CbrInitDto) {
    try {
      this.logger.log('verify init cbr on general-data.cbr.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const sampleExists = await this.sampleRepository.findOne({ _id: sample._id });

      // se não existir, retorna erro
      if (!sampleExists) throw new NotFound('Chosen sample of CBR');

      // verificar se existe uma cbr com mesmo nome e sampleId no banco de dados
      const cbrExists = await this.cbrRepository.findOne({ generalData: { name, sample: { _id: sample._id } } });

      // se existir, retorna erro
      if (cbrExists) throw new AlreadyExists(`CBR with name "${name} from user "${sample.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
