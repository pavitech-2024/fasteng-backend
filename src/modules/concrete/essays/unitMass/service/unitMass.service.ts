import { Injectable } from '@nestjs/common';
import { UnitMassRepository } from '../repository';
import { GeneralData_UnitMass_Service } from './general-data.unitMass.service';
import { UnitMassInitDto } from '../dto/unitMass-init.dto';

@Injectable()
export class UnitMassService {
  constructor(
    private readonly generalData_Service: GeneralData_UnitMass_Service,
    private readonly unitMass_Repository: UnitMassRepository, //private readonly calc_Service: Calc_UnitMass_Service,
  ) {}

  async verifyInitUnitMass(body: UnitMassInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitUnitMass(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }
}
