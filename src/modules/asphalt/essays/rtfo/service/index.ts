import { Injectable } from "@nestjs/common";
import { AlreadyExists } from "../../../../../utils/exceptions";
import { Calc_Rtfo_Dto, Calc_Rtfo_Out } from "../dto/calc-rtfo.dto";
import { RtfoInitDto } from "../dto/rtfo-init.dto";
import { RtfoRepository } from "../repository";
import { GeneralData_Rtfo_Service } from "./general-data.rtfo.service";
import { Calc_Rtfo_Service } from "./calc.rtfo.service";

@Injectable()
export class RtfoService {
  constructor(
    private readonly generalData_Service: GeneralData_Rtfo_Service,
    private readonly rtfo_Repository: RtfoRepository,
    private readonly calc_Service: Calc_Rtfo_Service,
  ) {}

  async verifyInitRtfo(body: RtfoInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitRtfo(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateRtfo(body: Calc_Rtfo_Dto) {
    try {
      return await this.calc_Service.calculateRtfo(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_Rtfo_Dto & Calc_Rtfo_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma rtfo com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.rtfo_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Rtfo with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const rtfo = await this.rtfo_Repository.create(body);

      return { success: true, data: rtfo };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}