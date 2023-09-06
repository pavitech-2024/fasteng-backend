import { Injectable, Logger } from '@nestjs/common';
import { GeneralData_SandIncrease_Service } from './general-data.sand-increase.service';
import { Calc_SandIncrease_Service } from './calc.sand-increase.service';
import { SandIncreaseRepository } from '../repository';
import { SandIncreaseInitDto } from '../dto/sand-increase-init.dto';
import { Calc_MoistureContentDto, Calc_SandIncrease_Dto, Calc_UnitMassDto } from '../dto/calc.sand-increase.dto';
import { AlreadyExists } from 'utils/exceptions';
import { Calc_UnitMass_Service } from './calc.unitMass.service';
import { Calc_MoistureContent_Service } from './calc.moistureContents.service';

@Injectable()
export class SandIncreaseService {
  private logger = new Logger(SandIncreaseService.name);
  constructor(
    private readonly generalData_Service: GeneralData_SandIncrease_Service,
    private readonly calc_UnitMass_Service: Calc_UnitMass_Service,
    private readonly calc_MoistureContent_Service: Calc_MoistureContent_Service,
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

  async calculateUnitMass(body: Calc_UnitMassDto) {
    try {
      return await this.calc_UnitMass_Service.calculateUnitMass(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async calculateMoistureContent(body: Calc_MoistureContentDto) {
    try {
      return await this.calc_MoistureContent_Service.calculateMoistureContent(body);
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
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe um ensaio de compressão com mesmo nome , sampleId e userId no banco de dados
      const alreadyExists = await this.sandIncreaseRepository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Sand increase with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const sandIncrease = await this.sandIncreaseRepository.create(body);

      return { success: true, data: sandIncrease };
    } catch (error) {
      this.logger.error(error)
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
