import { Injectable, Logger } from "@nestjs/common";
import { MarshallInitDto } from "../dto/marshall-init.dto";
import { GeneralData_Marshall_Service } from "./general-data.marshall.service";
import { MaterialSelection_Marshall_Service } from "./material-selection.marshall.service";
import { Marshall } from "../schemas";
import { MarshallRepository } from '../repository/index';
import { NotFound } from "../../../../../utils/exceptions";
import { MarshallStep3Dto } from "../dto/step-3-marshall.dto";
import { GranulometryComposition_Marshall_Service } from "./granulometry-composition.marshall.service";
import { SetBinderTrial_Marshall_Service } from "./initial-binder-trial.service";
import { maximumMixtureDensity_Marshall_Service } from "./maximumMixtureDensity.service";

@Injectable()
export class MarshallService {
  private logger = new Logger(MarshallService.name);

  constructor(
    private readonly marshall_repository: MarshallRepository,
    private readonly generalData_Service: GeneralData_Marshall_Service,
    private readonly materialSelection_Service: MaterialSelection_Marshall_Service,
    private readonly granulometryComposition_Service: GranulometryComposition_Marshall_Service,
    private readonly setBinderTrial_Service: SetBinderTrial_Marshall_Service,
    private readonly maximumMixtureDensity_Service: maximumMixtureDensity_Marshall_Service
  ) { }

  async getAllDosages(userId: string): Promise<Marshall[]> {
    try {
      // busca todas as dosagens no banco de dados
      const dosages = await this.marshall_repository.find();
      console.log("🚀 ~ MarshallService ~ getAllDosages ~ dosages:", dosages);

      const userDosages = dosages.filter((dosage) => dosage.generalData && dosage.generalData.userId === userId);

      // retorna as dosagens encontradas que pertencem ao usuário
      return userDosages;
    } catch (error) {
      this.logger.error(`error on get all dosages > [error]: ${error}`);

      throw error;
    }
  }

  async verifyInitMarshall(body: MarshallInitDto, userId: string) {
    try {
      const success = await this.generalData_Service.verifyInitMarshall(body, userId);

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

      this.logger.log(`materials returned > [materials]`)

      return { materials, success: true };
    } catch (error) {
      this.logger.error(`error on getting all materials by user id > [error]: ${error}`);
      const { status, name, message } = error;
      return { materials: [], success: false, error: { status, message, name } };
    }
  }

  async saveMaterialSelectionStep(body: any, userId: string) {
    try {
      const success = await this.materialSelection_Service.saveMaterials(body, userId);

      return { success }
    } catch (error) {
      this.logger.error(`error on save materials data marshall step > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getStep3Data(body: MarshallStep3Dto) {
    try {
      const { dnitBand, aggregates } = body;

      let higherBand = [];
      let lowerBand = [];
      if (dnitBand === "A") {
        higherBand = [
          ["3 pol - 75 mm", null],
          ["2 1/2 pol - 64mm", null],
          ["2 pol - 50mm", 100],
          ["1 1/2 pol - 37,5mm", 100],
          ["1 1/4 pol - 32mm", null],
          ["1 pol - 25mm", 100,],
          ["3/4 pol - 19mm", 90],
          ["1/2 pol - 12,5mm", null],
          ["3/8 pol - 9,5mm", 65],
          ["1/4 pol - 6,3mm", null],
          ["Nº4 - 4,8mm", 50],
          ["Nº8 - 2,4mm", null],
          ["Nº10 - 2,0mm", 40],
          ["Nº16 - 1,2mm", null],
          ["Nº30 - 0,6mm", null],
          ["Nº40 - 0,43mm", 30],
          ["Nº50 - 0,3mm", null],
          ["Nº80 - 0,18m", 0],
          ["Nº100 - 0,15mm", null],
          ["Nº200 - 0,075mm", 8],
        ];
        lowerBand = [
          ["3 pol - 75 mm", null],
          ["2 1/2 pol - 64mm", null],
          ["2 pol - 50mm", 100],
          ["1 1/2 pol - 37,5mm", 95],
          ["1 1/4 pol - 32mm", null],
          ["1 pol - 25mm", 75],
          ["3/4 pol - 19mm", 60],
          ["1/2 pol - 12,5mm", null],
          ["3/8 pol - 9,5mm", 35],
          ["1/4 pol - 6,3mm", null],
          ["Nº4 - 4,8mm", 25],
          ["Nº8 - 2,4mm", null],
          ["Nº10 - 2,0mm", 20],
          ["Nº16 - 1,2mm", null],
          ["Nº30 - 0,6mm", null],
          ["Nº40 - 0,43mm", 10],
          ["Nº50 - 0,3mm", null],
          ["Nº80 - 0,18m", 5],
          ["Nº100 - 0,15mm", null],
          ["Nº200 - 0,075mm", 1],
        ];
      } else if (dnitBand === "B") {
        higherBand = [
          ["3 pol - 75 mm", null],
          ["2 1/2 pol - 64mm", null],
          ["2 pol - 50mm", null],
          ["1 1/2 pol - 37,5mm", 100],
          ["1 1/4 pol - 32mm", null],
          ["1 pol - 25mm", 100],
          ["3/4 pol - 19mm", 100],
          ["1/2 pol - 12,5mm", null],
          ["3/8 pol - 9,5mm", 80],
          ["1/4 pol - 6,3mm", null],
          ["Nº4 - 4,8mm", 60],
          ["Nº8 - 2,4mm", null],
          ["Nº10 - 2,0mm", 45],
          ["Nº16 - 1,2mm", null],
          ["Nº30 - 0,6mm", null],
          ["Nº40 - 0,43mm", 32],
          ["Nº50 - 0,3mm", null],
          ["Nº80 - 0,18m", 20],
          ["Nº100 - 0,15mm", null],
          ["Nº200 - 0,075mm", 8],
        ];
        lowerBand = [
          ["3 pol - 75 mm", null],
          ["2 1/2 pol - 64mm", null],
          ["2 pol - 50mm", null],
          ["1 1/2 pol - 37,5mm", 100],
          ["1 1/4 pol - 32mm", null],
          ["1 pol - 25mm", 95],
          ["3/4 pol - 19mm", 80],
          ["1/2 pol - 12,5mm", null],
          ["3/8 pol - 9,5mm", 45],
          ["1/4 pol - 6,3mm", null],
          ["Nº4 - 4,8mm", 28],
          ["Nº8 - 2,4mm", null],
          ["Nº10 - 2,0mm", 20],
          ["Nº16 - 1,2mm", null],
          ["Nº30 - 0,6mm", null],
          ["Nº40 - 0,43mm", 10],
          ["Nº50 - 0,3mm", null],
          ["Nº80 - 0,18m", 8],
          ["Nº100 - 0,15mm", null],
          ["Nº200 - 0,075mm", 3],
        ];
      } else if (dnitBand === "C") {
        higherBand = [
          ["3 pol - 75 mm", null],
          ["2 1/2 pol - 64mm", null],
          ["2 pol - 50mm", null],
          ["1 1/2 pol - 37,5mm", null],
          ["1 1/4 pol - 32mm", null],
          ["1 pol - 25mm", null],
          ["3/4 pol - 19mm", null],
          ["1/2 pol - 12,5mm", 100],
          ["3/8 pol - 9,5mm", 90],
          ["1/4 pol - 6,3mm", null],
          ["Nº4 - 4,8mm", 72],
          ["Nº8 - 2,4mm", null],
          ["Nº10 - 2,0mm", 50],
          ["Nº16 - 1,2mm", null],
          ["Nº30 - 0,6mm", null],
          ["Nº40 - 0,43mm", 26],
          ["Nº50 - 0,3mm", null],
          ["Nº80 - 0,18m", 16],
          ["Nº100 - 0,15mm", null],
          ["Nº200 - 0,075mm", 10],
        ];
        lowerBand = [
          ["3 pol - 75 mm", null],
          ["2 1/2 pol - 64mm", null],
          ["2 pol - 50mm", null],
          ["1 1/2 pol - 37,5mm", null],
          ["1 1/4 pol - 32mm", null],
          ["1 pol - 25mm", null],
          ["3/4 pol - 19mm", null],
          ["1/2 pol - 12,5mm", 80],
          ["3/8 pol - 9,5mm", 70],
          ["1/4 pol - 6,3mm", null],
          ["Nº4 - 4,8mm", 44],
          ["Nº8 - 2,4mm", null],
          ["Nº10 - 2,0mm", 22],
          ["Nº16 - 1,2mm", null],
          ["Nº30 - 0,6mm", null],
          ["Nº40 - 0,43mm", 8],
          ["Nº50 - 0,3mm", null],
          ["Nº80 - 0,18m", 4],
          ["Nº100 - 0,15mm", null],
          ["Nº200 - 0,075mm", 2],
        ];
      }
      const dnitBands = { higher: higherBand, lower: lowerBand };

      const table_data = await this.granulometryComposition_Service.getGranulometryData(aggregates);

      const data = {
        dnitBands,
        table_data,
        project: [],
        graphData: [],
      }

      return {
        data,
        success: true,
      }
    } catch (error) {
      this.logger.error(`error on getting the step 3 data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async calculateStep3Data(body: any) {
    try {
      const granulometry = await this.granulometryComposition_Service.calculateGranulometry(body);

      const data = {
        percentsOfMaterials: granulometry.percentsOfMaterials,
        sumOfPercents: granulometry.sumOfPercents,
        pointsOfCurve: granulometry.pointsOfCurve,
        table_data: granulometry.table_data,
        projections: granulometry.projections
      };

      return { data, success: true };
    } catch (error) {
      this.logger.error(`error on getting the step 3 data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async saveStep3Data(body: any, userId: string) {
    try {
      const success = await this.granulometryComposition_Service.saveStep3Data(body, userId);

      return { success }
    } catch (error) {
      this.logger.error(`error on save materials data abcp step > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateStep4Data(body: any) {
    try {
      const binderTrial = await this.setBinderTrial_Service.calculateInitlaBinderTrial(body);

      const data = {
        percentsOfDosage: binderTrial.result.percentsOfDosage,
        bandsOfTemperatures: binderTrial.result.bandsOfTemperatures
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
      this.logger.error(`error on getting the step 3 data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async saveStep4Data(body: any, userId: string) {
    try {
      const success = await this.setBinderTrial_Service.saveStep4Data(body, userId);

      return { success }
    } catch (error) {
      this.logger.error(`error on save step data of marshall dosage > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getIndexesOfMissesSpecificGravity(aggregates: any) {
    try {
      const data = await this.maximumMixtureDensity_Service.getIndexesOfMissesSpecificGravity(aggregates);

      return { data, success: true }
    } catch (error) {
      this.logger.error(`error on save step data of marshall dosage > [error]: ${error}`);
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateDmtData(body: any) {
    try {
      const dmt = await this.maximumMixtureDensity_Service.calculateDmtData(body);
      console.log("🚀 ~ MarshallService ~ calculateDmtData ~ dmt:", dmt)

      const data = {
        maxSpecificGravity: dmt.result
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
      this.logger.error(`error on getting the step 5 dmt data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async calculateGmmData(body: any) {
    try {
      const gmm = await this.maximumMixtureDensity_Service.calculateGmmData(body);

      const data = {
        gmm
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
      this.logger.error(`error on getting the step 5 dmt data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async calculateRiceTest(body: any) {
    try {
      const riceTest = await this.maximumMixtureDensity_Service.calculateRiceTest(body);
      console.log("🚀 ~ MarshallService ~ calculateRiceTest ~ riceTest:", riceTest)

      const data = {
        riceTest
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
      this.logger.error(`error on getting the step 5 dmt data > [error]: ${error}`);
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }
  

  // async updateMarshall(marshall: Marshall): Promise<Marshall> {
  //   try {
  //     // busca um material com o id passado no banco de dados
  //     const marshallToUpdate = await this.marshall_repository.findOne({ _id: marshall._id });

  //     // se não encontrar o material, retorna um erro
  //     if (!marshallToUpdate) throw new NotFound('Marshall');

  //     // atualiza o material no banco de dados
  //     return this.marshall_repository.findOneAndUpdate({ _id: marshall._id }, marshall);
  //   } catch (error) {
  //     this.logger.error(`error on update marshall > [error]: ${error}`);

  //     throw error;
  //   }
  // }
}