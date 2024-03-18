import { Injectable } from "@nestjs/common";
import { AlreadyExists } from "../../../../../utils/exceptions";
import { AbrasionRepository } from "../repository";
import { AbrasionInitDto } from "../dto/abrasion-init.dto";
import { Calc_Abrasion_Dto, Calc_Abrasion_Out } from "../dto/calc-abrasion.dto";
import { Calc_Abrasion_Service } from "./calc.abrasion.service";
import { GeneralData_Abrasion_Service } from "./general-data.abrasion.service";

@Injectable()
export class AbrasionService {
  constructor(
    private readonly generalData_Service: GeneralData_Abrasion_Service,
    private readonly calc_Service: Calc_Abrasion_Service,
    private readonly Abrasion_Repository: AbrasionRepository,
  ) {}

  async verifyInitAbrasion(body: AbrasionInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitAbrasion(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateAbrasion(body: Calc_Abrasion_Dto) {
    try {
      return await this.calc_Service.calculateAbrasion(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_Abrasion_Dto & Calc_Abrasion_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma cbr com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.Abrasion_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Abrasion with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const cbr = await this.Abrasion_Repository.create(body);

      return { success: true, data: cbr };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}