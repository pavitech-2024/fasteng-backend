import { Injectable } from '@nestjs/common';
import { ChapmanInitDto } from '../dto/chapman-init.dto';
import { GeneralData_Chapman_Service } from './general-data.chapman.service';
import { ChapmanRepository } from '../repository';
import { Calc_CHAPMAN_Service } from './calc.chapman.service';
import { Calc_CHAPMAN_Out, Calc_CHAPMAN_dto } from '../dto/calc.chapman.dto';
import { AlreadyExists } from '../../../../../utils/exceptions';

@Injectable()
export class ChapmanService {
  constructor(
    private readonly generalData_Service: GeneralData_Chapman_Service,
    private readonly chapman_Repository: ChapmanRepository,
    private readonly calc_Service: Calc_CHAPMAN_Service,
  ) {}

  async verifyInitChapman(body: ChapmanInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitChapman(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateChapman(body: Calc_CHAPMAN_dto) {
    try {
      return await this.calc_Service.calculateChapman(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_CHAPMAN_dto & Calc_CHAPMAN_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma chapman com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.chapman_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Chapman with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const chapman = await this.chapman_Repository.create(body);

      return { success: true, data: chapman };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
