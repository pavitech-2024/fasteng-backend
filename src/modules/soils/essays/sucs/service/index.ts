import { Injectable, Logger } from '@nestjs/common';
import { GeneralData_SUCS_Service } from './general-data.sucs.service';
import { SucsInitDto } from '../dto/sucs-init.dto';
import { Calc_SUCS_Dto, Calc_SUCS_Out } from '../dto/calc.sucs.dto';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { SucsRepository } from '../repository';
import { Calc_SUCS_Service } from './calc.sucs.service';

@Injectable()
export class SucsService {
  constructor(
    private readonly generalData_Service: GeneralData_SUCS_Service,
    private readonly calc_Service: Calc_SUCS_Service,
    private readonly Sucs_Repository: SucsRepository,
  ) {}

  private logger = new Logger(SucsService.name);

  async verifyInitSucs(body: SucsInitDto) {
    try {
      const result = await this.generalData_Service.verifyInitSucs(body);

      return { result };
    } catch (error) {
      const { status, name, message } = error;
      return { result: { success: false, granulometry: []}, error: { status, message, name } };
    }
  }

  async calculateSucs(body: Calc_SUCS_Dto) {
    try {
      return await this.calc_Service.calculateSucs(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_SUCS_Dto & Calc_SUCS_Out) {
    try {
      const {
        name,
        sample: { _id: sampleId },
        userId,
      } = body.generalData;

      // verifica se existe uma sucs com mesmo nome , sampleId e userId no banco de dados
      const alreadyExists = await this.Sucs_Repository.findOne({
        'generalData.name': name,
        'generalData.sample._id': sampleId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`SUCS with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const sucs = await this.Sucs_Repository.create(body);

      return { success: true, data: sucs };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
