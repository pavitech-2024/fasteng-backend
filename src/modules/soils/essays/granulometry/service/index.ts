import { Injectable, Logger } from '@nestjs/common';
import { GeneralData_SoilsGranulometry_Service } from './general-data.granulometry.service';
import { SoilsGranulometryInitDto } from '../dto/granulometry-init.dto';
import { Calc_SoilsGranulometry_Dto, Calc_SoilsGranulometry_Out } from '../dto/calc.granulometry.dto';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { SoilsGranulometryRepository } from '../repository';
import { Calc_SoilsGranulometry_Service } from './calc.granulometry.service';
import { GranulometryNotFound } from 'utils/exceptions/granulometryNotFound';

@Injectable()
export class SoilsGranulometryService {
  private logger = new Logger(SoilsGranulometryService.name);

  constructor(
    private readonly generalData_Service: GeneralData_SoilsGranulometry_Service,
    private readonly calc_Service: Calc_SoilsGranulometry_Service,
    private readonly Granulometry_Repository: SoilsGranulometryRepository,
  ) {}

  async verifyInitGranulometry(body: SoilsGranulometryInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitGranulometry(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateGranulometry(body: Calc_SoilsGranulometry_Dto) {
    try {
      return await this.calc_Service.calculateGranulometry(body);
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_SoilsGranulometry_Dto & Calc_SoilsGranulometry_Out) {
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
      if (alreadyExists) throw new AlreadyExists(`Granulometry with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const granulometry = await this.Granulometry_Repository.create(body);

      return { success: true, data: granulometry };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async getGranulometryBySampleId(sample_id: string) {
    try {

      // verificar se existe uma granulometria para a sampleId no banco de dados
      const granulometry = await this.Granulometry_Repository.findOne({
        'generalData.sample._id': sample_id,
      });

      // se não existir, retorna erro
      if (!granulometry) throw new GranulometryNotFound('essay');

      return granulometry;

    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

}