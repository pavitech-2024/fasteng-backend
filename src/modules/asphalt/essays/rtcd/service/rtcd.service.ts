import { Injectable } from '@nestjs/common';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { Calc_Rtcd_Dto, Calc_Rtcd_Out } from '../dto/calc-rtcd.dto';
import { RtcdInitDto } from '../dto/init-rtcd.dto';
import { RtcdRepository } from '../repository';
import { GeneralData_Rtcd_Service } from './general-data.rtcd.service';
import { Calc_Rtcd_Service } from './calc.rtcd.service';

@Injectable()
export class RtcdService {
  constructor(
    private readonly generalData_Service: GeneralData_Rtcd_Service,
    private readonly rtcd_Repository: RtcdRepository,
    private readonly calc_Service: Calc_Rtcd_Service,
  ) {}

  async verifyInitRtcd(body: RtcdInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitRtcd(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateRtcd(body: Calc_Rtcd_Dto) {
    try {
      return await this.calc_Service.calculateRtcd(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_Rtcd_Dto & Calc_Rtcd_Out) {
    try {
      const {
        name,
        userId,
      } = body.generalData;

      // verifica se existe uma rtcd com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.rtcd_Repository.findOne({
        'generalData.name': name,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Rtcd with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const rtcd = await this.rtcd_Repository.create(body);

      return { success: true, data: rtcd };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
