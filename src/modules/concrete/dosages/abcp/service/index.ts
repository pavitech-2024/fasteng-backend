import { Injectable, Logger } from "@nestjs/common";
import { ABCPInitDto } from "../dto/abcp-init.dto";
import { GeneralData_ABCP_Service } from "./general-data.abcp.service";
import { MaterialSelection_ABCP_Service } from "./material-selection.abcp.service";
import { EssaySelection_ABCP_Service } from './essay-selection.abcp.service';
import { ABCPEssaySelectionDto } from "../dto/abcp-essay-selection.dto";
import { Calc_ABCP_Dto, Calc_ABCP_Out } from "../dto/abcp-calculate-results.dto";
import { Calculate_ABCP_Results_Service } from "./calc-abcp.service";
import { ABCPRepository } from "../repository";
import { AlreadyExists } from "utils/exceptions";
import { ABCP } from "../schemas";

@Injectable()
export class ABCPService {
  private logger = new Logger(ABCPService.name);

  constructor(
    private readonly generalData_Service: GeneralData_ABCP_Service,
    private readonly materialSelection_Service: MaterialSelection_ABCP_Service,
    private readonly essaySelection_Service: EssaySelection_ABCP_Service,
    private readonly calculateResults_Service: Calculate_ABCP_Results_Service,
    private readonly ABCPRepository: ABCPRepository
  ) { }

  async verifyInitABCP(body: ABCPInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitABCP(body);

      return { success };
    } catch (error) {
      this.logger.error(`error on verify init > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getUserMaterials(userId: string) {
    try {
      const materials = await this.materialSelection_Service.getMaterials(userId);

      this.logger.log(`materials returned > [materials]: ${materials}`)

      return { materials, success: true };
    } catch (error) {
      this.logger.error(`error on get all materials by user id > [error]: ${error}`);
      const { status, name, message } = error;
      return { materials: [], success: false, error: { status, message, name } };
    }
  }

  async getEssaysByMaterials(data: ABCPEssaySelectionDto) {
    try {
      const essays = await this.essaySelection_Service.getEssays(data);
      
      this.logger.log(`essays returned > [essays]: ${essays}`);

      return { essays, success: true };
    } catch (error) {
      this.logger.error(`error on get all essays by the materials ids > [error]: ${error}`);
      const { status, name, message } = error;
      return { essays: [], success: false, error: { status, message, name } };
    }
  }

  async getAllDosages(userId: string): Promise<ABCP[]> {
    try {
      // busca todos os materiais no banco de dados
      const dosages = await this.ABCPRepository.find();

      // retorna os materiais encontrados que pertencem ao usuário
      return dosages.filter((dosage) => dosage.generalData.userId === userId);
    } catch (error) {
      this.logger.error(`error on get all dosages > [error]: ${error}`);

      throw error;
    }
  }

  async calculateAbcpDosage(data: Calc_ABCP_Dto) {
    try {
      return await this.calculateResults_Service.calculateAbcpDosage(data);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveDosage(body: Calc_ABCP_Dto & Calc_ABCP_Out) {
    try {
      const {
        name,
        userId,
      } = body.generalData;

      // verifica se existe uma granulometry com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.ABCPRepository.findOne({
        'generalData.name': name,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`ABCP with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const abcp = await this.ABCPRepository.create(body);

      return { success: true, data: abcp };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}