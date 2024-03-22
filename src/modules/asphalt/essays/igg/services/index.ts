import { Injectable } from '@nestjs/common';
import { Calc_Igg_Dto, Calc_Igg_Out } from '../dto/calc-igg.dto';
import { Calc_Igg_Service } from './calc.igg.service';
import { GeneralData_Igg_Service } from './general-data.igg.service';
import { IggInitDto } from '../dto/init-igg.dto';
import { IggRepository } from '../repository';
import { AlreadyExists } from '../../../../../utils/exceptions/alreadyExists';

@Injectable()
export class IggService {
  constructor(
    private readonly generalData_Service: GeneralData_Igg_Service,
    private readonly igg_Repository: IggRepository,
    private readonly calc_Service: Calc_Igg_Service,
  ) {}

  async verifyInitIgg(body: IggInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitIgg(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateIgg(body: Calc_Igg_Dto) {
    try {
      return await this.calc_Service.calculateIgg(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_Igg_Dto & Calc_Igg_Out) {
    try {
      const { name, userId } = body.generalData;

      // verifica se existe uma igg com mesmo nome  e userId no banco de dados
      const alreadyExists = await this.igg_Repository.findOne({
        'generalData.name': name,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Igg with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const igg = await this.igg_Repository.create(body);

      return { success: true, data: igg };
    } catch (error) {
      const { status, name, message } = error;
      console.log(error);

      return { success: false, error: { status, message, name } };
    }
  }
}
