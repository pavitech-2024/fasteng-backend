import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from 'modules/asphalt/materials/repository';
import { NotFound, AlreadyExists } from 'utils/exceptions';
import { RtInitDto } from '../dto/init-rt.dto';
import { RtRepository } from '../repository';

@Injectable()
export class GeneralData_Rt_Service {
  private logger = new Logger(GeneralData_Rt_Service.name);

  constructor(private readonly rtRepository: RtRepository, private readonly materialsRepository: MaterialsRepository) {}

  async verifyInitRt({ name, material }: RtInitDto) {
    try {
      this.logger.log('verify init rt on general-data.rt.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of rt');

      // verificar se existe uma rt com mesmo nome e materialId no banco de dados
      const rtExists = await this.rtRepository.findOne({
        generalData: { name, material: { _id: material._id } },
      });

      // se existir, retorna erro
      if (rtExists) throw new AlreadyExists(`Rt with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
