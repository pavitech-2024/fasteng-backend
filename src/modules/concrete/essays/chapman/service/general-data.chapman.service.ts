import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from '../../../materials/repository';
import { ChapmanInitDto } from '../dto/chapman-init.dto';
import { AlreadyExists, NotFound } from '../../../../../utils/exceptions';
import { ChapmanRepository } from '../repository';

@Injectable()
export class GeneralData_Chapman_Service {
  private logger = new Logger(GeneralData_Chapman_Service.name);

  constructor(
    private readonly chapmanRepository: ChapmanRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitChapman({ name, material }: ChapmanInitDto) {
    try {
      this.logger.log('verify init chapman on general-data.chapman.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of Chapman');

      // verificar se existe uma chapman com mesmo nome e materialId no banco de dados
      const chapmanExists = await this.chapmanRepository.findOne({
        generalData: { name, material: { _id: material._id } },
      });

      // se existir, retorna erro
      if (chapmanExists) throw new AlreadyExists(`Chapman with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
