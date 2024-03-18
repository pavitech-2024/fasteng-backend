import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { NotFound, AlreadyExists } from '../../../../../utils/exceptions';
import { ViscosityRotationalRepository } from '../repository';
import { ViscosityRotationalInitDto } from '../dto/init-viscosityRotational.dto';

@Injectable()
export class GeneralData_ViscosityRotational_Service {
  private logger = new Logger(GeneralData_ViscosityRotational_Service.name);

  constructor(
    private readonly viscosityRotationalRepository: ViscosityRotationalRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitViscosityRotational({ name, material }: ViscosityRotationalInitDto) {
    try {
      this.logger.log('verify init Viscosity Rotational on general-data.viscosityRotational.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of Viscosity Rotational');

      // verificar se existe uma sayboltFurol com mesmo nome e materialId no banco de dados
      const viscosityRotationalExists = await this.viscosityRotationalRepository.findOne({
        generalData: { name, material: { _id: material._id } },
      });

      // se existir, retorna erro
      if (viscosityRotationalExists)
        throw new AlreadyExists(`Viscosity Rotational with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
