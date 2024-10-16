import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { NotFound, AlreadyExists } from '../../../../../utils/exceptions';
import { RtcdInitDto } from '../dto/init-rtcd.dto';
import { RtcdRepository } from '../repository';

@Injectable()
export class GeneralData_Rtcd_Service {
  private logger = new Logger(GeneralData_Rtcd_Service.name);

  constructor(
    private readonly rtcdRepository: RtcdRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitRtcd({ name }: RtcdInitDto) {
    try {
      this.logger.log('verify init rtcd on general-data.rtcd.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const rtcdExists = await this.rtcdRepository.findOne({ "generalData.name": name });

      // se existir, retorna erro
      if (rtcdExists) throw new AlreadyExists(`Rtcd with name "${name}`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
