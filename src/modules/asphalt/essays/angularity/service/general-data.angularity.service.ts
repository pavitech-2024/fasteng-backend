import { Injectable, Logger } from '@nestjs/common';
import { AngularityRepository } from '../repository';
import { AngularityInitDto } from '../dto/angularity-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { NotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_ANGULARITY_Service {
  private logger = new Logger(GeneralData_ANGULARITY_Service.name);

  constructor(private readonly angularityRepository: AngularityRepository, private readonly materialRepository: MaterialsRepository) { }

  async verifyInitAngularity({ name, material }: AngularityInitDto) {
    try {
      this.logger.log('verify init angularity on general-data.angularity.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({
        "_id": material._id
      });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('material');

      // verificar se existe uma angularity com mesmo nome e materialId no banco de dados
      const angularityExists = await this.angularityRepository.findOne({
        "generalData.name": name,
        "generalData.material._id": material._id
      });

      // se existir, retorna erro
      if (angularityExists) throw new AlreadyExists(`name`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
