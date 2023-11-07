import { Injectable } from "@nestjs/common";
import { AlreadyExists } from "utils/exceptions";
import { AdhesivenessRepository } from "../repository";
import { AdhesivenessInitDto } from "../dto/adhesiveness-init.dto";
import { Calc_Adhesiveness_Service } from "./calc.adhesiveness.service";
import { GeneralData_Adhesiveness_Service } from "./general-data.adhesiveness.service";
import { Calc_Adhesiveness_Dto, Calc_Adhesiveness_Out } from "../dto/calc.adhesiveness.dto";

@Injectable()
export class AdhesivenessService {
  constructor(
    private readonly generalData_Service: GeneralData_Adhesiveness_Service,
    private readonly adhesiveness_Repository: AdhesivenessRepository,
    private readonly calc_Service: Calc_Adhesiveness_Service,
  ) {}

  async verifyInitAdhesiveness(body: AdhesivenessInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitAdhesiveness(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateAdhesiveness(body: Calc_Adhesiveness_Dto) {
    try {
      return await this.calc_Service.calculateAdhesiveness(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_Adhesiveness_Dto & Calc_Adhesiveness_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma adhesiveness com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.adhesiveness_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Adhesiveness with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const adhesiveness = await this.adhesiveness_Repository.create(body);

      return { success: true, data: adhesiveness };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
