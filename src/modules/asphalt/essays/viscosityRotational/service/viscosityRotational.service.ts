import { Injectable } from '@nestjs/common';
import { AlreadyExists } from 'utils/exceptions';
import { Calc_ViscosityRotational_Dto, Calc_ViscosityRotational_Out } from '../dto/calc-viscosityRotational.dto';
import { ViscosityRotationalInitDto } from '../dto/init-viscosityRotational.dto';
import { ViscosityRotationalRepository } from '../repository';
import { Calc_ViscosityRotational_Service } from './calc.viscosityRotational.service';
import { GeneralData_ViscosityRotational_Service } from './general-data.viscosityRotational.service';

@Injectable()
export class ViscosityRotationalService {
  constructor(
    private readonly generalData_Service: GeneralData_ViscosityRotational_Service,
    private readonly viscosityRotational_Repository: ViscosityRotationalRepository,
    private readonly calc_Service: Calc_ViscosityRotational_Service,
  ) {}

  async verifyInitViscosityRotational(body: ViscosityRotationalInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitViscosityRotational(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateViscosityRotational(body: Calc_ViscosityRotational_Dto) {
    try {
      return await this.calc_Service.calculateViscosityRotational(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_ViscosityRotational_Dto & Calc_ViscosityRotational_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma sayboltFurol com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.viscosityRotational_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Viscosity Rotational with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const viscosityRotational = await this.viscosityRotational_Repository.create(body);

      return { success: true, data: viscosityRotational };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
