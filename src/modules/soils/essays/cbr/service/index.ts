import { Injectable } from '@nestjs/common';
import { GeneralData_CBR_Service } from './general-data.cbr.service';
import { CbrInitDto } from '../dto/cbr-init.dto';
import { Calc_CBR_Dto, Calc_CBR_Out } from '../dto/calc.cbr.dto';
import { Calc_CBR_Service } from './calc.cbr.service';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { CbrRepository } from '../repository';

@Injectable()
export class CbrService {
  constructor(
    private readonly generalData_Service: GeneralData_CBR_Service,
    private readonly calc_Service: Calc_CBR_Service,
    private readonly Cbr_Repository: CbrRepository,
  ) {}

  async verifyInitCbr(body: CbrInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitCbr(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateCbr(body: Calc_CBR_Dto) {
    try {
      return await this.calc_Service.calculateCbr(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_CBR_Dto & Calc_CBR_Out) {
    try {
      const {
        name,
        sample: { _id: sampleId },
        userId,
      } = body.generalData;

      // verifica se existe uma cbr com mesmo nome , sampleId e userId no banco de dados
      const alreadyExists = await this.Cbr_Repository.findOne({
        'generalData.name': name,
        'generalData.sample._id': sampleId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`CBR with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const cbr = await this.Cbr_Repository.create(body);

      return { success: true, data: cbr };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
