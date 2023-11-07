import { Injectable, Logger } from '@nestjs/common';
import { MaterialsRepository } from 'modules/concrete/materials/repository';
import { NotFound, AlreadyExists } from 'utils/exceptions';
import { UnitMassRepository } from '../repository';
import { UnitMass_Init_Dto } from '../dto/unitMass-init.dto';

@Injectable()
export class GeneralData_UnitMass_Service {
  // verifyInitUnitMass(body: UnitMass_Init_Dto) {
  //   throw new Error('Method not implemented.');
  // }
  private logger = new Logger(GeneralData_UnitMass_Service.name);

  constructor(
    private readonly UnitMassRepository: UnitMassRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitUnitMass({ experimentName, method, material }: UnitMass_Init_Dto) {
    try {
      this.logger.log('verify init unitMass on general-data.unitMass.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      this.logger.log('verify if material exists> [body]');
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of unitMass');

      // verificar se existe uma unitmass com mesmo nome e materialId no banco de dados
      this.logger.log('verify if experiment name already exists> [body]');
      const unitMassExists = await this.UnitMassRepository.findOne({
        generalData: { experimentName, material: { _id: material._id }, method },
      });

      // se existir, retorna erro
      if (unitMassExists) throw new AlreadyExists(`UnitMass with name "${experimentName} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
