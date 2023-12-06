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

  async verifyInitRtcd({ name, material }: RtcdInitDto) {
    try {
      this.logger.log('verify init rtcd on general-data.rtcd.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of rtcd');

      // verificar se existe uma rtcd com mesmo nome e materialId no banco de dados
      const rtcdExists = await this.rtcdRepository.findOne({
        generalData: { name, material: { _id: material._id } },
      });

      // se existir, retorna erro
      if (rtcdExists) throw new AlreadyExists(`Rtcd with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
