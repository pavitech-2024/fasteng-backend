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

  async saveEssay(body: any) {
    try {
      const name = body.generalData?.name;
      const materialId = body.generalData?.material?._id;
      const userId = body.generalData?.userId;

      // Verifica se todos os campos necessários estão presentes
      if (!name || !materialId || !userId) {
        throw new Error("Missing required fields in generalData");
      }

      // Verifica se existe um ensaio com mesmo nome, materialId e userId
      const alreadyExists = await this.softeningPoint_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // Se existir, retorna erro
      if (alreadyExists) {
        throw new AlreadyExists(`Softening point with name "${name}" from user "${userId}"`);
      }

      // Se não existir, salva no banco de dados
      const softeningPoint = await this.softeningPoint_Repository.create(body);

      return { success: true, data: softeningPoint };
    } catch (error) {
      const { status, name, message } = error;
      return { 
        success: false, 
        error: { 
          status: status || 400, 
          message: message || "Error saving essay", 
          name: name || "Error" 
        } 
      };
    }
  }
}