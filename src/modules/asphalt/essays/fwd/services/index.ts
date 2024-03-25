import { Injectable } from '@nestjs/common';
import { Calc_Fwd_Dto, Calc_Fwd_Out } from '../dto/calc-fwd.dto';
import { Calc_Fwd_Service } from './calc.fwd.service';
import { GeneralData_Fwd_Service } from './general-data.fwd.service';
import { FwdInitDto } from '../dto/init-fwd.dto';
import { FwdRepository } from '../repository';
import { AlreadyExists } from '../../../../../utils/exceptions/alreadyExists';

@Injectable()
export class FwdService {
  constructor(
    private readonly generalData_Service: GeneralData_Fwd_Service,
    private readonly fwd_Repository: FwdRepository,
    private readonly calc_Service: Calc_Fwd_Service,
  ) {}

  async verifyInitFwd(body: FwdInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitFwd(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateFwd(body: Calc_Fwd_Dto) {
    try {
      return await this.calc_Service.calculateFwd(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_Fwd_Dto & Calc_Fwd_Out) {
    try {
      const { name, userId } = body.generalData;

      // verifica se existe uma fwd com mesmo nome  e userId no banco de dados
      const alreadyExists = await this.fwd_Repository.findOne({
        'generalData.name': name,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Fwd with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const fwd = await this.fwd_Repository.create(body);

      return { success: true, data: fwd };
    } catch (error) {
      const { status, name, message } = error;
      console.log(error);

      return { success: false, error: { status, message, name } };
    }
  }
}
