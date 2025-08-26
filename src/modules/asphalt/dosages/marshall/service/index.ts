import { Injectable, Logger } from "@nestjs/common";
import { MarshallInitDto } from "../dto/marshall-init.dto";
import { GeneralData_Marshall_Service } from "./general-data.marshall.service";
//import { MaterialSelection_Marshall_Service } from "./material-selection.marshall.service";
import { Marshall } from "../schemas";
import { MarshallRepository } from '../repository/index';
import { MarshallGeneralDataDTO } from "../dto/marshal-general-data.dto";
import { NotFound } from "../../../../../utils/exceptions";
import { MarshallStep3Dto } from "../dto/step-3-marshall.dto";
import { GranulometryComposition_Marshall_Service } from "./granulometry-composition.marshall.service";
import { SetBinderTrial_Marshall_Service } from "./initial-binder-trial.service";
import { MaximumMixtureDensity_Marshall_Service } from "./maximumMixtureDensity.service";
import { VolumetricParameters_Marshall_Service } from "./volumetric-parameters.service";
import { OptimumBinderContent_Marshall_Service } from "./optimum-binder.marshall.service";
import { ConfirmCompression_Marshall_Service } from "./confirm-compression.marshall.service";
import { GetIndexesOfMissesSpecificGravityDTO } from "../dto/get-indexes-of-misses-specific-gravity.dto";
import { CalculateDmtDataDTO } from "../dto/calculate-dmt-data.dto";
import { CalculateGmmDataDTO } from "../dto/calculate-gmm-data.dto";
import { CalculateRiceTestDTO } from "../dto/calculate-rice-test.dto";
import { SaveMaximumMixtureDensityDataDTO } from "../dto/save-maximum-mixture-density-data.dto";
import { BaseMarshallService } from "./base.marshall.service";
import { StepData } from '../types/step-data.type';
import { SaveStep3DTO, SaveStep4DTO, SaveStep5DTO, SaveStep6DTO, SaveStep7DTO, SaveStep8DTO, SaveStepDTO } from "../dto/save-step.dto";
import { GranulometryCompositionDataDTO } from "../dto/granulometry-composition-data-dto";
import { MarshallStep } from "../types/marshall.types";
import { Step3Result,  } from "../types/step-data.type";
import { Step3Data } from "../types/step-data.type";
import { SaveMarshallDosageDTO } from "../dto/binder-trial-data.dto";
import { handleError } from "utils/error-handler";
//teste
  import { Types } from 'mongoose';
  import { CalculateStep3DTO } from "../dto/calculate-step-5.dto";


@Injectable()
export class MarshallService {
  private logger = new Logger(MarshallService.name);

  constructor(
    private readonly marshall_repository: MarshallRepository,
    private readonly generalData_Service: GeneralData_Marshall_Service,
    private readonly baseMarshallService: BaseMarshallService,
    //private readonly materialSelection_Service: MaterialSelection_Marshall_Service,
    private readonly granulometryComposition_Service: GranulometryComposition_Marshall_Service,
    private readonly setBinderTrial_Service: SetBinderTrial_Marshall_Service,
    private readonly maximumMixtureDensity_Service: MaximumMixtureDensity_Marshall_Service,
    private readonly volumetricParameters_Service: VolumetricParameters_Marshall_Service,
    private readonly optimumBinder_Service: OptimumBinderContent_Marshall_Service,
    private readonly confirmCompression_Service: ConfirmCompression_Marshall_Service
  ) { }

  async saveStepData(body: SaveStepDTO): Promise<{ success: boolean; error?: any }> {
  try {
    const { dosageId, step, data, userId } = body;
    
    if (!dosageId || !step) {
      throw new Error('dosageId and step are required');
    }

    // Convert step para o tipo específico
    const validStep = step as MarshallStep;
    
    const success = await this.baseMarshallService.saveStepData(
      dosageId, 
      validStep, 
      data, 
      userId
    );
    
    return { success };
  } catch (error) {
    handleError(error, "error saving step data");
    const { status, name, message } = error;
    return { success: false, error: { status, message, name } };
  }
}

  async getAllDosages(userId: string): Promise<Marshall[]> {
    try {
      // busca todas as dosagens no banco de dados
      const dosages = await this.marshall_repository.find();

      const userDosages = dosages.filter((dosage) => dosage.generalData && dosage.generalData.userId === userId);

      // retorna as dosagens encontradas que pertencem ao usuário
      return userDosages;
    } catch (error) {
      handleError(error, "error on get all dosages");
      throw error;
    }
  }
//Corrigido pra MarshallGeneralDataDTO
  async verifyInitMarshall(body: MarshallGeneralDataDTO, userId: string) {
    try {
      const dosage = await this.generalData_Service.verifyInitMarshall(body, userId);

      return dosage;
    } catch (error) {
      handleError(error, "error on verify init");
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  /*
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
  }*/

  async getDosageById(dosageId: string) {
    try {
      const dosage = await this.generalData_Service.getDosageById(dosageId);

      this.logger.log(`dosage returned > [dosage]`);

      return { dosage, success: true };
    } catch (error) {
       handleError(error, "error on getting dosage by id");
      const { status, name, message } = error;
      return { materials: [], success: false, error: { status, message, name } };
    }
  }

  /*
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
*/

//Aqui tem um erro: dnitBand / dnitBands??
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
       handleError(error, "error on getting the step 3 data");
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async calculateStep3Data(body: CalculateStep3DTO): Promise<Step3Result> {
  try {
    const { dnitBands } = body;

    const granulometry = await this.granulometryComposition_Service.calculateGranulometry(body);

    let higherBand: (number | null)[];
    let lowerBand: (number | null)[];

    if (dnitBands === 'A') {
      higherBand = [null, null, 100, 100, null, 100, 90, null, 65, null, 50, null, 40, null, null, 30, null, 20, null, 8];
      lowerBand = [null, null, 100, 95, null, 75, 60, null, 35, null, 25, null, 20, null, null, 10, null, 5, null, 1];
    } else if (dnitBands === 'B') {
      higherBand = [null, null, null, 100, null, 100, 100, null, 80, null, 60, null, 45, null, null, 32, null, 20, null, 8];
      lowerBand = [null, null, null, 100, null, 95, 80, null, 45, null, 28, null, 20, null, null, 10, null, 8, null, 3];
    } else {
      higherBand = [null, null, null, null, null, null, null, 100, 90, null, 72, null, 50, null, null, 26, null, 16, null, 10];
      lowerBand = [null, null, null, null, null, null, null, 80, 70, null, 44, null, 22, null, null, 8, null, 4, null, 2];
    }

    const data: Step3Data = {
      percentsOfMaterials: granulometry.percentsOfMaterials,
      sumOfPercents: granulometry.sumOfPercents,
      pointsOfCurve: granulometry.pointsOfCurve,
      table_data: granulometry.table_data,
      projections: granulometry.projections,
      bands: { higherBand, lowerBand }
    };

    return { data, success: true };
  } catch (error) {
     handleError(error, "error on getting the step 3 data" );
    const { status, name, message } = error;
    return { data: null, success: false, error: { status, name, message } };
  }
}

   
async saveStep3Data(body: SaveStep3DTO, userId: string): Promise<{ success: boolean; error?: any }> {
  return this.saveStepData({
    dosageId: body.dosageId,
    step: 'granulometryComposition',
    data: body.data,
    userId
  });
}

  async calculateStep4Data(body: any) {
    try {
      const binderTrial = await this.setBinderTrial_Service.calculateInitialBinderTrial(body);

      const data = {
        percentsOfDosage: binderTrial.result.percentsOfDosage,
        bandsOfTemperatures: binderTrial.result.bandsOfTemperatures,
        newPercentOfDosage: binderTrial.result.newPercentOfDosage
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
       handleError(error, "error on getting the step 3 data");
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

async saveStep4Data(body: SaveStep4DTO, userId: string): Promise<{ success: boolean; error?: any }> {
  return this.saveStepData({
    dosageId: body.dosageId,
    step: 'binderTrial',
    data: body.data,
    userId
  });
}

  async getIndexesOfMissesSpecificGravity(dto: GetIndexesOfMissesSpecificGravityDTO): Promise<{ data: any; success: boolean; error?: any }> {
    try {
      const data = await this.maximumMixtureDensity_Service.getIndexesOfMissesSpecificGravity(dto);
      return { data, success: true };
    } catch (error) {
       handleError(error, "Error getting indexes of misses specific gravity");
      const { status, name, message } = error;
      return { 
        data: null, 
        success: false, 
        error: { status, message, name } 
      };
    }
  }

  async calculateDmtData(dto: CalculateDmtDataDTO): Promise<{ data: any; success: boolean; error?: any }> {
    try {
      const dmt = await this.maximumMixtureDensity_Service.calculateDmtData(dto);

      const data = {
        maxSpecificGravity: dmt.maxSpecificGravity.result,
        method: dmt.maxSpecificGravity.method,
        listOfSpecificGravities: dmt.listOfSpecificGravities
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
       handleError(error, "Error calculating DMT data");
      const { status, name, message } = error;
      return { 
        data: null, 
        success: false, 
        error: { status, message, name } 
      };
    }
  }


  async calculateGmmData(dto: CalculateGmmDataDTO): Promise<{ data: any; success: boolean; error?: any }> {
    try {
      const gmm = await this.maximumMixtureDensity_Service.calculateGmmData(dto);

      const data = {
        maxSpecificGravity: gmm.maxSpecificGravity.result,
        method: gmm.maxSpecificGravity.method,
        listOfSpecificGravities: gmm.listOfSpecificGravities
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
       handleError(error, "Error calculating GMM data");
      const { status, name, message } = error;
      return { 
        data: null, 
        success: false, 
        error: { status, message, name } 
      };
    }
  }

   async calculateRiceTest(dto: CalculateRiceTestDTO): Promise<{ data: any; success: boolean; error?: any }> {
    try {
      const riceTest = await this.maximumMixtureDensity_Service.calculateRiceTest(dto);

      const data = {
        maxSpecificGravity: riceTest,
        method: 'GMM'
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
       handleError(error, "Error calculating rice test");
      const { status, name, message } = error;
      return { 
        data: null, 
        success: false, 
        error: { status, message, name } 
      };
    }
  }

async saveMistureMaximumDensityData(dto: SaveMaximumMixtureDensityDataDTO, userId: string): Promise<{ success: boolean; error?: any }> {
    try {
      const success = await this.maximumMixtureDensity_Service.saveMistureMaximumDensityData(dto, userId);
      return { success };
    } catch (error) {
       handleError(error, 'Error saving maximum mixture density data');
      const { status, name, message } = error;
      return { 
        success: false, 
        error: { status, message, name } 
      };
    }
  }
  
  async setVolumetricParameters(body: any) {
    try {
      const volumetricParameters = await this.volumetricParameters_Service.setVolumetricParameters(body);

      const data = {
        volumetricParameters
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
       handleError(error, 'error on setting step 6 volumetric parameters data');
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async saveVolumetricParametersData(body: any, userId: string) {
    try {
      const success = await this.volumetricParameters_Service.saveVolumetricParametersData(body, userId);

      return { success }
    } catch (error) {
       handleError(error, 'error on save step 6 data of marshall dosage' );
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async setOptimumBinderContentData(body: any) {
    try {
      const optimumBinder = await this.optimumBinder_Service.setOptimumBinderContentData(body);

      const data = {
        optimumBinder
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
       handleError(error, 'error on setting step 7 optimum binder data');
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async setOptimumBinderContentDosageGraph(body: any) {
    try {
      const { dnitBand, volumetricParameters, trial, percentsOfDosage } = body;
      const optimumBinderDosageGraph = await this.optimumBinder_Service.plotDosageGraph(dnitBand, volumetricParameters, trial, percentsOfDosage);

      const data = {
        optimumBinderDosageGraph
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
       handleError(error, 'error on setting step 7 optimum binder dosage graph data');
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async getOptimumBinderExpectedParameters(body: any) {
    try {
      const expectedParameters = await this.optimumBinder_Service.getExpectedParameters(body);

      const data = {
        expectedParameters
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
       handleError(error, 'error on setting step 7 optimum binder dosage graph data');
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

 async saveStep7Data(body: SaveStep7DTO, userId: string): Promise<{ success: boolean; error?: any }> {
  return this.saveStepData({
    dosageId: body.dosageId,
    step: 'optimumBinderContent',
    data: body.data,
    userId
  });
}

  async confirmSpecificGravity(body: any) {
    try {
      const confirmedSpecificGravity = await this.confirmCompression_Service.confirmSpecificGravity(body);

      const data = {
        confirmedSpecificGravity
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
       handleError(error, 'error on confirming step 8 specific gravity');
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

  async confirmVolumetricParameters(body: any) {
    try {

      const confirmedVolumetricParameters = await this.volumetricParameters_Service.confirmVolumetricParameters(body);

      const data = {
        confirmedVolumetricParameters
      };

      return { 
        data, 
        success: true 
      };
    } catch (error) {
       handleError(error, 'error on confirming step 8 specific gravity');
      const { status, name, message } = error;
      return { data: null, success: false, error: { status, message, name } };
    }
  }

async saveStep8Data(body: SaveStep8DTO, userId: string): Promise<{ success: boolean; error?: any }> {
  return this.saveStepData({
    dosageId: body.dosageId,
    step: 'confirmationCompression',
    data: body.data,
    userId
  });
}

//Pronto pra teste
  async saveMarshallDosage(body: SaveMarshallDosageDTO, userId: string) {
    try {
      const success = await this.generalData_Service.saveMarshallDosage(body, userId);

      return { success }
    } catch (error) {
      handleError(error, 'error on save step 8 data of marshall dosage')
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }
//test
/*
  async  createFakeDosage(marshallService: MarshallService) {
  // 1️⃣ Cria um userId fake
  const fakeUserId = new Types.ObjectId().toHexString();

  // 2️⃣ Define os dados da dosagem
  const dosageBody = {
    generalData: {
      name: 'Dosagem Teste Fake',
      objective: 'teste',
      dnitBand: 'B',
      description: 'Dosagem criada para teste'
    },
    // adicione outros campos necessários aqui
  };

  // 3️⃣ Chama o service
  const result = await marshallService.saveMarshallDosage(dosageBody, fakeUserId);

  console.log('Dosagem criada:', result);

  // 4️⃣ Retorna o userId e a resposta para usar nos testes
  return {
    userId: fakeUserId,
    dosage: result
  };
}
*/
  async deleteMarshallDosage(id: string) {
    try {
      const success = await this.generalData_Service.deleteMarshallDosage(id);

      return { success }
    } catch (error) {
      handleError(error, 'error on delete marshall dosage')
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }
}