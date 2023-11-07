import { Injectable } from "@nestjs/common";
import { AlreadyExists } from "../../../../../utils/exceptions";
import { Calc_Penetration_Dto, Calc_Penetration_Out } from "../dto/calc.penetration.dto";
import { PenetrationInitDto } from "../dto/penetration-init.dto";
import { PenetrationRepository } from "../repository";
import { GeneralData_Penetration_Service } from "./general-data.penetration.service";
import { Calc_Penetration_Service } from "./calc.penetration.service";

@Injectable()
export class PenetrationService {
  constructor(
    private readonly generalData_Service: GeneralData_Penetration_Service,
    private readonly calc_Service: Calc_Penetration_Service,
    private readonly Penetration_Repository: PenetrationRepository,
  ) {}

  async verifyInitPenetration(body: PenetrationInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitPenetration(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculatePenetration(body: Calc_Penetration_Dto) {
    try {
      return await this.calc_Service.calculatePenetration(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_Penetration_Dto & Calc_Penetration_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma cbr com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.Penetration_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Penetration with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const cbr = await this.Penetration_Repository.create(body);

      return { success: true, data: cbr };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
