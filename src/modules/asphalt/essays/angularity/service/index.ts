import { Injectable, Logger } from '@nestjs/common';
import { AngularityInitDto } from '../dto/angularity-init.dto';
import { Calc_ANGULARITY_Dto, Calc_ANGULARITY_Out } from '../dto/calc.angularity.dto';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { AngularityRepository } from '../repository';
import { Calc_ANGULARITY_Service } from './calc.angularity.service';
import { GeneralData_ANGULARITY_Service } from './general-data.angularity.service';

@Injectable()
export class AngularityService {
  private logger = new Logger(AngularityService.name);

  constructor(
    private readonly generalData_Service: GeneralData_ANGULARITY_Service,
    private readonly calc_Service: Calc_ANGULARITY_Service,
    private readonly Angularity_Repository: AngularityRepository,
  ) {}

  async verifyInitAngularity(body: AngularityInitDto) {
    try {
      const result = await this.generalData_Service.verifyInitAngularity(body);

      return { result };
    } catch (error) {
      const { status, name, message } = error;
      return { result: { success: false}, error: { status, message, name } };
    }
  }

  async calculateAngularity(body: Calc_ANGULARITY_Dto) {
    try {
      return await this.calc_Service.calculateAngularity(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_ANGULARITY_Dto & Calc_ANGULARITY_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma angularity com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.Angularity_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`ANGULARITY with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const angularity = await this.Angularity_Repository.create(body);

      return { success: true, data: angularity };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

}