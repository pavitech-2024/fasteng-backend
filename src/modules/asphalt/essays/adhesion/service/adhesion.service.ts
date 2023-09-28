import { Injectable } from "@nestjs/common";
import { AlreadyExists } from "utils/exceptions";
import { AdhesionRepository } from "../repository";
import { AdhesionInitDto } from "../dto/adhesion-init.dto";
import { Calc_Adhesion_Service } from "./calc.adhesion.service";
import { GeneralData_Adhesion_Service } from "./general-data.adhesion.service";
import { Calc_Adhesion_Dto, Calc_Adhesion_Out } from "../dto/calc.adhesion.dto";

@Injectable()
export class AdhesionService {
  constructor(
    private readonly generalData_Service: GeneralData_Adhesion_Service,
    private readonly adhesion_Repository: AdhesionRepository,
    private readonly calc_Service: Calc_Adhesion_Service,
  ) {}

  async verifyInitAdhesion(body: AdhesionInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitAdhesion(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateAdhesion(body: Calc_Adhesion_Dto) {
    try {
      return await this.calc_Service.calculateAdhesion(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_Adhesion_Dto & Calc_Adhesion_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma adhesion com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.adhesion_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Adhesion with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const adhesion = await this.adhesion_Repository.create(body);

      return { success: true, data: adhesion };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
