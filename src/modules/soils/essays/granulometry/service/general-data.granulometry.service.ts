import { Injectable, Logger } from '@nestjs/common';
import { SoilsGranulometryRepository } from '../repository';
import { SoilsGranulometryInitDto } from '../dto/granulometry-init.dto';
import { SamplesRepository } from '../../../samples/repository';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { GranulometryNotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_SoilsGranulometry_Service {
  private logger = new Logger(GeneralData_SoilsGranulometry_Service.name);

  constructor(private readonly granulometryRepository: SoilsGranulometryRepository, private readonly sampleRepository: SamplesRepository) { }

  async verifyInitGranulometry({ name, sample }: SoilsGranulometryInitDto) {
    try {
      this.logger.log('verify init granulometry on general-data.granulometry.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const sampleExists = await this.sampleRepository.findOne({
        "_id": sample._id
      });

      // se não existir, retorna erro
      if (!sampleExists) throw new GranulometryNotFound('sample');

      // verificar se existe uma granulometry com mesmo nome e sampleId no banco de dados
      const granulometryExists = await this.granulometryRepository.findOne({
        "generalData.name": name,
        "generalData.sample._id": sample._id,
      });

      // se existir, retorna erro
      if (granulometryExists) throw new AlreadyExists('name');

      return true;
    } catch (error) {
      throw error;
    }
  }
}
