import { Injectable, Logger } from '@nestjs/common';
import { SpecifyMassRepository } from '../repository';
import { SpecifyMassInitDto } from '../dto/specifymass-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { NotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_SPECIFYMASS_Service {
  private logger = new Logger(GeneralData_SPECIFYMASS_Service.name);

  constructor(private readonly specifymassRepository: SpecifyMassRepository, private readonly materialRepository: MaterialsRepository) { }

  async verifyInitSpecifyMass({ name, material }: SpecifyMassInitDto) {
    try {
      this.logger.log('verify init specifymass on general-data.specifyMass.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({
        "_id": material._id
      });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('material');

      // verificar se existe uma specifymass com mesmo nome e materialId no banco de dados
      const specifymassExists = await this.specifymassRepository.findOne({
        "generalData.name": name,
        "generalData.material._id": material._id
      });

      // se existir, retorna erro
      if (specifymassExists) throw new AlreadyExists(`name`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
