import { Injectable } from "@nestjs/common";
import { AlreadyExists } from "../../../../../utils/exceptions";
import { Calc_SandEquivalent_Dto, Calc_SandEquivalent_Out } from "../dto/calc-sandEquivalent.dto";
import { SandEquivalentInitDto } from "../dto/init-sandEquivalent.dto";
import { SandEquivalentRepository } from "../repository";
import { GeneralData_SandEquivalent_Service } from "./general-data.sandEquivalent.service";
import { Calc_SandEquivalent_Service } from "./calc.sandEquivalent.service";

@Injectable()
export class SandEquivalentService {
  constructor(
    private readonly generalData_Service: GeneralData_SandEquivalent_Service,
    private readonly sandEquivalent_Repository: SandEquivalentRepository,
    private readonly calc_Service: Calc_SandEquivalent_Service,
  ) {}

  async verifyInitSandEquivalent(body: SandEquivalentInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitSandEquivalent(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateSandEquivalent(body: Calc_SandEquivalent_Dto) {
    try {
      return await this.calc_Service.calculateSandEquivalent(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_SandEquivalent_Dto & Calc_SandEquivalent_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma sandEquivalent com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.sandEquivalent_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`SandEquivalent with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const sandEquivalent = await this.sandEquivalent_Repository.create(body);

      return { success: true, data: sandEquivalent };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}