import { Injectable, Logger } from '@nestjs/common';
import { FlashPointRepository } from '../repository';
import { FlashPointInitDto } from '../dto/flashPoint-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { NotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_FLASHPOINT_Service {
  private logger = new Logger(GeneralData_FLASHPOINT_Service.name);

  constructor(private readonly flashPointRepository: FlashPointRepository, private readonly materialRepository: MaterialsRepository) { }

  async verifyInitFlashPoint({ name, material }: FlashPointInitDto) {
    try {
      this.logger.log('verify init flashPoint on general-data.flashPoint.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({
        "_id": material._id
      });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('material');

      // verificar se existe uma flashPoint com mesmo nome e materialId no banco de dados
      const flashPointExists = await this.flashPointRepository.findOne({
        "generalData.name": name,
        "generalData.material._id": material._id
      });

      // se existir, retorna erro
      if (flashPointExists) throw new AlreadyExists(`name`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
