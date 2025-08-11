import { Injectable } from "@nestjs/common";
import { AlreadyExists } from "../../../../../utils/exceptions";
import { Calc_Ddui_Dto, Calc_Ddui_Out } from "../dto/calc-ddui.dto";
import { DduiInitDto } from "../dto/init-ddui.dto";
import { DduiRepository } from "../repository";
import { Calc_Ddui_Service } from "./calc-ddui.service";
import { GeneralData_Ddui_Service } from "./general-data.ddui.service";

@Injectable()
export class DduiService {
  constructor(
    private readonly generalData_Service: GeneralData_Ddui_Service,
    private readonly ddui_Repository: DduiRepository,
    private readonly calc_Service: Calc_Ddui_Service,
  ) {}

  async verifyInitDdui(body: DduiInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitDdui(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateDdui(body: Calc_Ddui_Dto) {
    try {
      return await this.calc_Service.calculateDdui(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_Ddui_Dto & Calc_Ddui_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma ddui com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.ddui_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Ddui with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const ddui = await this.ddui_Repository.create(body);

      return { success: true, data: ddui };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

    async deleteEssay(id: string) {
    try {
      const ddui = await this.ddui_Repository.findOne({ _id: id });

      if (ddui) {
        await this.ddui_Repository.deleteOne(id);
      }

      return { success: true, data: ddui };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}