import { Injectable, Logger } from '@nestjs/common';
import { CompressionRepository } from '../repository';
import { SamplesRepository } from 'modules/soils/samples/repository';
import { CompressionInitDto } from '../dto/compression-init.dto';
import { AlreadyExists, NotFound } from 'utils/exceptions';

@Injectable()
export class GeneralData_Compression_Service {
  private logger = new Logger(GeneralData_Compression_Service.name);

  constructor(
    private readonly compressionRepository: CompressionRepository,
    private readonly sampleRepository: SamplesRepository,
  ) {}

  async verifyInitCompression({ name, sample }: CompressionInitDto) {
    try {
      this.logger.log('verify init compression on general-data.compression.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const sampleExists = await this.sampleRepository.findOne({ _id: sample._id });

      // se não existir, retorna erro
      if (!sampleExists) throw new NotFound('Chosen sample of Compression');

      // verificar se existe uma cbr com mesmo nome e sampleId no banco de dados
      const compressionExists = await this.compressionRepository.findOne({
        generalData: { name, sample: { _id: sample._id } },
      });

      // se existir, retorna erro
      if (compressionExists) throw new AlreadyExists(`Compression with name "${name} from user "${sample.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
