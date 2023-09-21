import { Injectable, Logger } from '@nestjs/common';
import { GeneralData_ConcreteGranulometry_Service } from './general-data.granulometry.service';
import { ConcreteGranulometryInitDto } from '../dto/concretegranulometry-init.dto';
import { Calc_ConcreteGranulometry_Dto, Calc_ConcreteGranulometry_Out } from '../dto/calc.granulometry.dto';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { ConcreteGranulometryRepository } from '../repository';
import { Calc_ConcreteGranulometry_Service } from './calc.granulometry.service';

@Injectable()
export class ConcreteGranulometryService {
  private logger = new Logger(ConcreteGranulometryService.name);

  constructor(
    private readonly generalData_Service: GeneralData_ConcreteGranulometry_Service,
    private readonly calc_Service: Calc_ConcreteGranulometry_Service,
    private readonly Granulometry_Repository: ConcreteGranulometryRepository,
  ) {}

  async verifyInitGranulometry(body: ConcreteGranulometryInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitGranulometry(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateGranulometry(body: Calc_ConcreteGranulometry_Dto) {
    try {
      return await this.calc_Service.calculateGranulometry(body);
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_ConcreteGranulometry_Dto & Calc_ConcreteGranulometry_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma granulometry com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.Granulometry_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`GRANULOMETRY with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const granulometry = await this.Granulometry_Repository.create(body);

      return { success: true, data: granulometry };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

}