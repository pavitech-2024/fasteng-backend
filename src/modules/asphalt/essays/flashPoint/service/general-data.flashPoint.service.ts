import { Injectable, Logger } from '@nestjs/common';
import { FlashPointRepository } from '../repository';
import { FlashPointInitDto } from '../dto/flashpoint-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { NotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_FLASHPOINT_Service {
  private logger = new Logger(GeneralData_FLASHPOINT_Service.name);

  constructor(private readonly flashpointRepository: FlashPointRepository, private readonly materialRepository: MaterialsRepository) { }

  async verifyInitFlashPoint({ name, material }: FlashPointInitDto) {
    try {
      this.logger.log('verify init flashpoint on general-data.flashpoint.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({
        "_id": material._id
      });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('material');

      // verificar se existe uma flashpoint com mesmo nome e materialId no banco de dados
      const flashpointExists = await this.flashpointRepository.findOne({
        "generalData.name": name,
        "generalData.material._id": material._id
      });

      // se existir, retorna erro
      if (flashpointExists) throw new AlreadyExists(`name`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
