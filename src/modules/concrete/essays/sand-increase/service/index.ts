import { Injectable } from '@nestjs/common';
import { GeneralData_SandIncrease_Service } from './general-data.sand-increase.service';
import { Calc_SandIncrease_Service } from './calc.sand-increase.service';
import { SandIncreaseRepository } from '../repository';
import { SandIncreaseInitDto } from '../dto/sand-increase-init.dto';
import { Calc_SandIncrease_Dto } from '../dto/calc.sand-increase.dto';
import { AlreadyExists } from 'utils/exceptions';

@Injectable()
export class SandIncreaseService {
  constructor(
    private readonly generalData_Service: GeneralData_SandIncrease_Service,
    private readonly calc_Service: Calc_SandIncrease_Service,
    private readonly sandIncreaseRepository: SandIncreaseRepository
  ){}

  async verifyInitSandIncrease(body: SandIncreaseInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitSandIncrease(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateSandIncrease(body: Calc_SandIncrease_Dto) {
    try {
      return await this.calc_Service.calculateSandIncrease(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: any) {
    try {
      const {
        name,
        sample: { _id: sampleId },
        userId,
      } = body.generalData;

      // verifica se existe um ensaio de compressão com mesmo nome , sampleId e userId no banco de dados
      const alreadyExists = await this.sandIncreaseRepository.findOne({
        'generalData.name': name,
        'generalData.material._id': sampleId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Sand increase with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const sandIncrease = await this.sandIncreaseRepository.create(body);

      return { success: true, data: sandIncrease };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
