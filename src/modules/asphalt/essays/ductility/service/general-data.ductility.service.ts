import { Injectable, Logger } from '@nestjs/common';
import { DuctilityRepository } from '../repository';
import { DuctilityInitDto } from '../dto/ductility-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { NotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_DUCTILITY_Service {
  private logger = new Logger(GeneralData_DUCTILITY_Service.name);

  constructor(private readonly ductilityRepository: DuctilityRepository, private readonly materialRepository: MaterialsRepository) { }

  async verifyInitDuctility({ name, material }: DuctilityInitDto) {
    try {
      this.logger.log('verify init ductility on general-data.ductility.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({
        "_id": material._id
      });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('material');

      // verificar se existe uma ductility com mesmo nome e materialId no banco de dados
      const ductilityExists = await this.ductilityRepository.findOne({
        "generalData.name": name,
        "generalData.material._id": material._id
      });

      // se existir, retorna erro
      if (ductilityExists) throw new AlreadyExists(`name`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
