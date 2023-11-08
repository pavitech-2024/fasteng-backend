import { Injectable } from "@nestjs/common";
import { AlreadyExists } from "utils/exceptions";
import { Calc_SayboltFurol_Dto, Calc_SayboltFurol_Out } from "../dto/calc-sayboltFurol.dto";
import { SayboltFurolInitDto } from "../dto/init-sayboltFurol.dto";
import { SayboltFurolRepository } from "../repository";
import { Calc_SayboltFurol_Service } from "./calc.sayboltFurol.service";
import { GeneralData_SayboltFurol_Service } from "./general-data.sayboltFurol.service";

@Injectable()
export class SayboltFurolService {
  constructor(
    private readonly generalData_Service: GeneralData_SayboltFurol_Service,
    private readonly sayboltFurol_Repository: SayboltFurolRepository,
    private readonly calc_Service: Calc_SayboltFurol_Service,
  ) {}

  async verifyInitSayboltFurol(body: SayboltFurolInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitSayboltFurol(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateSayboltFurol(body: Calc_SayboltFurol_Dto) {
    try {
      return await this.calc_Service.calculateSayboltFurol(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_SayboltFurol_Dto & Calc_SayboltFurol_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma sayboltFurol com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.sayboltFurol_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Saybolt-Furol with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const sayboltFurol = await this.sayboltFurol_Repository.create(body);

      return { success: true, data: sayboltFurol };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}