import { Injectable } from '@nestjs/common';
import { GeneralData_UnitMass_Service } from './general-data.unitMass.service';
import { UnitMass_Init_Dto } from '../dto/unitMass-init.dto';
import { UnitMass_Step2_Dto } from '../dto/unitMass-step2.dto';
import { step2Data_Service } from './step2Data.unitMass.service';
import { Result_UnitMass_Service } from './result.unitMass.service';
import { Result_UnitMass_Dto, UnitMass_Result } from '../dto/unitMass-result.dto';
import { AlreadyExists } from 'utils/exceptions';

@Injectable()
export class UnitMassService {
  UnitMassRepository: any;
  constructor(
    private readonly generalData_Service: GeneralData_UnitMass_Service,
    private readonly step2_UnitMass_Service: step2Data_Service,
    private readonly result_UnitMass_Service: Result_UnitMass_Service,
  ) {}

  async verifyInitUnitMass(body: UnitMass_Init_Dto) {
    try {
      const success = await this.generalData_Service.verifyInitUnitMass(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async verifyStep2DataUnitMass(body: UnitMass_Step2_Dto) {
    try {
      const success = await this.step2_UnitMass_Service.verifyStep2DataUnitMass(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async resultUnitMass(body: Result_UnitMass_Dto) {
    try {
      return await this.result_UnitMass_Service.calculateUnitMass(body);
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Result_UnitMass_Dto & UnitMass_Result) {
    try {
      const {
        experimentName,
        material: { _id: materialId },
        userId,
        method,
      } = body.generalData;

      // verifica se existe uma chapman com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.UnitMassRepository.findOne({
        'generalData.experimentName': experimentName,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
        'generalData.method': method,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`UnitMass with name "${experimentName}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const unitMass = await this.UnitMassRepository.create(body);

      return { success: true, data: unitMass };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
