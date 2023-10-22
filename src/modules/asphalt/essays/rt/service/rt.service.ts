import { Injectable } from '@nestjs/common';
import { AlreadyExists } from 'utils/exceptions';
import { Calc_Rt_Dto, Calc_Rt_Out } from '../dto/calc-rt.dto';
import { RtInitDto } from '../dto/init-rt.dto';
import { RtRepository } from '../repository';
import { GeneralData_Rt_Service } from './general-data.rt.service';
import { Calc_Rt_Service } from './calc.rt.service';

@Injectable()
export class RtService {
  constructor(
    private readonly generalData_Service: GeneralData_Rt_Service,
    private readonly rt_Repository: RtRepository,
    private readonly calc_Service: Calc_Rt_Service,
  ) {}

  async verifyInitRt(body: RtInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitRt(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateRt(body: Calc_Rt_Dto) {
    try {
      return await this.calc_Service.calculateRt(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_Rt_Dto & Calc_Rt_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma rt com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.rt_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Rt with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const rt = await this.rt_Repository.create(body);

      return { success: true, data: rt };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
