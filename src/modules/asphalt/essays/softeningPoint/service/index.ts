import { Injectable } from "@nestjs/common";
import { AlreadyExists } from "../../../../../utils/exceptions";
import { Calc_SofteningPoint_Dto, Calc_SofteningPoint_Out } from "../dto/calc-softeningPoint.dto";
import { SofteningPointInitDto } from "../dto/init-softeningPoint.dto";
import { SofteningPointRepository } from "../repository";
import { Calc_SofteningPoint_Service } from "./calc-softeningPoint.softeningPoint.service";
import { GeneralData_SofteningPoint_Service } from "./general-data.softeningPoint.service";

@Injectable()
export class SofteningPointService {
  constructor(
    private readonly generalData_Service: GeneralData_SofteningPoint_Service,
    private readonly softeningPoint_Repository: SofteningPointRepository,
    private readonly calc_Service: Calc_SofteningPoint_Service,
  ) {}

  async verifyInitSofteningPoint(body: SofteningPointInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitSofteningPoint(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateSofteningPoint(body: Calc_SofteningPoint_Dto) {
    try {
      return await this.calc_Service.calculateSofteningPoint(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_SofteningPoint_Dto & Calc_SofteningPoint_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma softeningPoint com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.softeningPoint_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Softening point with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const softeningPoint = await this.softeningPoint_Repository.create(body);

      return { success: true, data: softeningPoint };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}