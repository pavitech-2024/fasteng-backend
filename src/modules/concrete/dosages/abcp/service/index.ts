import { Injectable, Logger } from "@nestjs/common";
import { ABCPInitDto } from "../dto/abcp-init.dto";
import { GeneralData_ABCP_Service } from "./general-data.abcp.service";
import { MaterialSelection_ABCP_Service } from "./material-selection.abcp.service";
import { EssaySelection_ABCP_Service } from './essay-selection.abcp.service';
import { ABCPEssaySelectionDto } from "../dto/abcp-essay-selection.dto";
import { Calc_ABCP_Dto, Calc_ABCP_Out, SaveAbcpDto } from "../dto/abcp-calculate-results.dto";
import { Calculate_ABCP_Results_Service } from "./calc-abcp.service";
import { ABCPRepository } from "../repository";
import { AlreadyExists } from "../../../../../utils/exceptions";
import { ABCP, ABCPDocument } from "../schemas";
import { InsertParams_ABCP_Service } from "./insert-params.abcp.service";
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";


@Injectable()
export class ABCPService {
  private logger = new Logger(ABCPService.name);

  constructor(
    @InjectModel(ABCP.name, DATABASE_CONNECTION.CONCRETE) 
    private abcpModel: Model<ABCPDocument>,
    private readonly generalData_Service: GeneralData_ABCP_Service,
    private readonly materialSelection_Service: MaterialSelection_ABCP_Service,
    private readonly essaySelection_Service: EssaySelection_ABCP_Service,
    private readonly insertParams_Service: InsertParams_ABCP_Service,
    private readonly calculateResults_Service: Calculate_ABCP_Results_Service,
    private readonly ABCPRepository: ABCPRepository
  ) { }

  async verifyInitABCP(body: any, userId: string) {
    try {
      const success = await this.generalData_Service.verifyInitABCP(body, userId);

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

  async saveMaterialSelectionStep(body: any, userId: string) {
    try {
      const success = await this.materialSelection_Service.saveMaterials(body, userId);

      return { success }
    } catch (error) {
      this.logger.error(`error on save materials data abcp step > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
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

  async saveEssaySelectionStep(body: any, userId: string) {
    try {
      const success = await this.essaySelection_Service.saveEssays(body, userId);

      return { success }
    } catch (error) {
      this.logger.error(`error on save essays data abcp step > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveInsertParamsStep(body: any, userId: string) {
    try {
      const success = await this.insertParams_Service.saveInsertParams(body, userId);

      return { success }
    } catch (error) {
      this.logger.error(`error on save essays data abcp step > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getAllDosages(userId: string): Promise<ABCP[]> {
    try {
      // busca todos os materiais no banco de dados
      const dosages = await this.ABCPRepository.find();

      // retorna os materiais encontrados que pertencem ao usuário
      return dosages.filter((dosage) => dosage.generalData && dosage.generalData.userId === userId);
    } catch (error) {
      this.logger.error(`error on get all dosages > [error]: ${error}`);

      throw error;
    }
  }

  async getDosageById(dosageId: string): Promise<ABCP> {
    try {
      // busca todos os materiais no banco de dados
      const dosage = await this.ABCPRepository.findById(dosageId);

      // retorna os materiais encontrados que pertencem ao usuário
      return dosage;
    } catch (error) {
      this.logger.error(`error on get dosage with this id > [error]: ${error}`);

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

  async saveDosage(body: SaveAbcpDto) {
    try {
      const {
        name,
        userId,
      } = body.generalData;
  
      const {
        results
      } = body;

      const abcpExists: any = await this.ABCPRepository.findOne({
        'generalData.name': name,
        'generalData.userId': userId,
      });

      const abcpAllData = { ...abcpExists._doc, results }
      
      await this.abcpModel.updateOne(
        { "_id": abcpExists._id },
        abcpAllData
      );

      await this.ABCPRepository.saveStep(abcpExists._doc, 5)

      return { success: true, data: abcpExists };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}