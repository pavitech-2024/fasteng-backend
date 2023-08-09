import { Injectable } from '@nestjs/common';
import { GeneralData_HRB_Service } from './general-data.hrb.service';
import { HrbInitDto } from '../dto/hrb-init.dto';
import { Calc_HRB_Dto, Calc_HRB_Out } from '../dto/calc.hrb.dto';
import { Calc_HRB_Service } from './calc.hrb.service';
import { HrbRepository } from '../repository';
import { AlreadyExists } from '../../../../../utils/exceptions';

@Injectable()
export class HrbService {
  constructor(
    private readonly generalData_Service: GeneralData_HRB_Service,
    private readonly calc_Service: Calc_HRB_Service,
    private readonly Hrb_Repository: HrbRepository,
  ) {}

  async verifyInitHrb(body: HrbInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitHrb(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateHrb(body: Calc_HRB_Dto) {
    try {
      return await this.calc_Service.calculateHrb(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_HRB_Dto & Calc_HRB_Out) {
    try {
      const {
        name,
        sample: { _id: sampleId },
        userId,
      } = body.generalData;

      // verifica se existe uma hrb com mesmo nome , sampleId e userId no banco de dados
      const alreadyExists = await this.Hrb_Repository.findOne({
        'generalData.name': name,
        'generalData.sample._id': sampleId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`HRB with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const hrb = await this.Hrb_Repository.create(body);

      return { success: true, data: hrb };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
