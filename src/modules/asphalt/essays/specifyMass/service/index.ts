import { Injectable, Logger } from '@nestjs/common';
import { GeneralData_SPECIFYMASS_Service } from './general-data.specifyMass.servive';
import { SpecifyMassInitDto } from '../dto/specifyMass-init.dto';
import { Calc_SPECIFYMASS_Dto, Calc_SPECIFYMASS_Out } from '../dto/calc.specifyMass.dto';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { SpecifyMassRepository } from '../repository';
import { Calc_SPECIFYMASS_Service } from './calc.specifymass.service';

@Injectable()
export class SpecifyMassService {
  private logger = new Logger(SpecifyMassService.name);

  constructor(
    private readonly generalData_Service: GeneralData_SPECIFYMASS_Service,
    private readonly calc_Service: Calc_SPECIFYMASS_Service,
    private readonly SpecifyMass_Repository: SpecifyMassRepository,
  ) {}

  async verifyInitSpecifyMass(body: SpecifyMassInitDto) {
    try {
      const result = await this.generalData_Service.verifyInitSpecifyMass(body);

      return { result };
    } catch (error) {
      const { status, name, message } = error;
      return { result: { success: false}, error: { status, message, name } };
    }
  }

  async calculateSpecifyMass(body: Calc_SPECIFYMASS_Dto) {
    try {
      return await this.calc_Service.calculateSpecifyMass(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_SPECIFYMASS_Dto & Calc_SPECIFYMASS_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma specifymass com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.SpecifyMass_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`SPECIFYMASS with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const specifymass = await this.SpecifyMass_Repository.create(body);

      return { success: true, data: specifymass };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

}