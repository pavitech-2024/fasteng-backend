import { Injectable, Logger } from '@nestjs/common';
import { FlashPointInitDto } from '../dto/flashPoint-init.dto';
import { Calc_FLASHPOINT_Dto, Calc_FLASHPOINT_Out } from '../dto/calc.flashPoint.dto';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { FlashPointRepository } from '../repository';
import { Calc_FLASHPOINT_Service } from './calc.flashPoint.service';
import { GeneralData_FLASHPOINT_Service } from './general-data.flashPoint.service';

@Injectable()
export class FlashPointService {
  private logger = new Logger(FlashPointService.name);

  constructor(
    private readonly generalData_Service: GeneralData_FLASHPOINT_Service,
    private readonly calc_Service: Calc_FLASHPOINT_Service,
    private readonly FlashPoint_Repository: FlashPointRepository,
  ) {}

  async verifyInitFlashPoint(body: FlashPointInitDto) {
    try {
      const result = await this.generalData_Service.verifyInitFlashPoint(body);

      return { result };
    } catch (error) {
      const { status, name, message } = error;
      return { result: { success: false}, error: { status, message, name } };
    }
  }

  async calculateFlashPoint(body: Calc_FLASHPOINT_Dto) {
    try {
      return await this.calc_Service.calculateFlashPoint(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_FLASHPOINT_Dto & Calc_FLASHPOINT_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma flashPoint com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.FlashPoint_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`FLASHPOINT with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const flashPoint = await this.FlashPoint_Repository.create(body);

      return { success: true, data: flashPoint };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

}