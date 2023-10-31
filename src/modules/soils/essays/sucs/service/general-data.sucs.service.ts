import { Injectable, Logger } from '@nestjs/common';
import { SucsRepository } from '../repository';
import { SucsInitDto } from '../dto/sucs-init.dto';
import { SamplesRepository } from '../../../samples/repository';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { GranulometryRepository } from '../../granulometry/repository/index';
import { GranulometryNotFound } from '../../../../../utils/exceptions';
import { SucsNotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_SUCS_Service {
  private logger = new Logger(GeneralData_SUCS_Service.name);

  constructor(private readonly sucsRepository: SucsRepository, private readonly granulometryRepository: GranulometryRepository, private readonly sampleRepository: SamplesRepository) {}

  async verifyInitSucs({ name, sample }: SucsInitDto) {
    try {
      // this.logger.log('verify init sucs on general-data.sucs.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const sampleExists = await this.sampleRepository.findOne({ 
        "_id": sample._id 
      });

      // se não existir, retorna erro
      if (!sampleExists) throw new SucsNotFound('sample');

      // verificar se existe uma sucs com mesmo nome e sampleId no banco de dados
      const sucsExists = await this.sucsRepository.findOne({ 
        "generalData.name": name, 
        "generalData.sample._id": sample._id 
      });

      // se existir, retorna erro
      if (sucsExists) throw new AlreadyExists('name');

      // verificar se existe uma granulometria para a sampleId no banco de dados
      const granulometryExists = await this.granulometryRepository.findOne({ 
        "generalData.sample._id": sample._id  
      });

      // se não existir, retorna erro
      if (!granulometryExists) throw new GranulometryNotFound('essay');

      return true;
    } catch (error) {
      throw error;
    }
  }
}
