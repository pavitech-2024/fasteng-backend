import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from 'modules/concrete/materials/repository';
import { NotFound, AlreadyExists } from 'utils/exceptions';
import { UnitMass_Init_Dto } from '../dto/unitMass-init.dto';
import { UnitMassRepository } from '../repository';

@Injectable()
export class GeneralData_UnitMass_Service {
  private logger = new Logger(GeneralData_UnitMass_Service.name);

  constructor(
    private readonly UnitMassRepository: UnitMassRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitUnitMass({ experimentName, method, material }: UnitMass_Init_Dto) {
    try {
      this.logger.log('verify init unitMass on general-data.unitMass.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findById(material._id);

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of unitMass');

      // verificar se existe uma chapman com mesmo nome e materialId no banco de dados
      const unitMassExists = await this.UnitMassRepository.findOne({
        generalData: { experimentName, material: { _id: material._id }, method },
      });

      // se existir, retorna erro
      if (unitMassExists)
        throw new AlreadyExists(`UnitMass with name "${experimentName} from user "${material.userId}"`);
    } catch (error) {
      throw error;
    }
  }
}
