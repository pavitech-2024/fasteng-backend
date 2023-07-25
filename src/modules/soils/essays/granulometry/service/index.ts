import { Injectable } from '@nestjs/common';
import { GeneralData_GRANULOMETRY_Service } from './general-data.granulometry.service';
import { GranulometryInitDto } from '../dto/granulometry-init.dto';
import { Calc_GRANULOMETRY_Dto, Calc_GRANULOMETRY_Out } from '../dto/calc.granulometry.dto';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { GranulometryRepository } from '../repository';
import { Calc_GRANULOMETRY_Service } from './calc.granulometry.service';

@Injectable()
export class GranulometryService {
  constructor(
    private readonly generalData_Service: GeneralData_GRANULOMETRY_Service,
    private readonly calc_Service: Calc_GRANULOMETRY_Service,
    private readonly Granulometry_Repository: GranulometryRepository,
  ) {}

  async verifyInitGranulometry(body: GranulometryInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitGranulometry(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateGranulometry(body: Calc_GRANULOMETRY_Dto) {
    try {
      return await this.calc_Service.calculateGranulometry(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_GRANULOMETRY_Dto & Calc_GRANULOMETRY_Out) {
    try {
      const {
        name,
        sample: { _id: sampleId },
        userId,
      } = body.generalData;

      // verifica se existe uma granulometry com mesmo nome , sampleId e userId no banco de dados
      const alreadyExists = await this.Granulometry_Repository.findOne({
        'generalData.name': name,
        'generalData.sample._id': sampleId,
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