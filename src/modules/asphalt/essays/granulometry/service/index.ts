import { Injectable, Logger } from "@nestjs/common";
import { AlreadyExists } from "utils/exceptions";
import { Calc_AsphaltGranulometry_Dto, Calc_AsphaltGranulometry_Out } from "../dto/asphalt.calc.granulometry.dto";
import { AsphaltGranulometryInitDto } from "../dto/asphalt.granulometry-init.dto";
import { AsphaltGranulometryRepository } from "../repository";
import { GeneralData_AsphaltGranulometry_Service } from "./general-data.granulometry.service";
import { Calc_AsphaltGranulometry_Service } from "./calc.granulometry.service";

@Injectable()
export class AsphaltGranulometryService {
  private logger = new Logger(AsphaltGranulometryService.name);

  constructor(
    private readonly generalData_Service: GeneralData_AsphaltGranulometry_Service,
    private readonly calc_Service: Calc_AsphaltGranulometry_Service,
    private readonly Granulometry_Repository: AsphaltGranulometryRepository,
  ) {}

  async verifyInitGranulometry(body: AsphaltGranulometryInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitGranulometry(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateGranulometry(body: Calc_AsphaltGranulometry_Dto) {
    try {
      return await this.calc_Service.calculateGranulometry(body);
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_AsphaltGranulometry_Dto & Calc_AsphaltGranulometry_Out) {
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
