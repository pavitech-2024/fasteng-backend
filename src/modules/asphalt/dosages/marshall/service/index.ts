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
import { SaveVolumetricParametersRequestDTO, SaveVolumetricParametersResponseDTO } from "../dto/volumetric-params-data.dto";
import { getMarshallBandsByDnit } from "utils/services/marshall-bands.util";
import { getBandsByType } from 'utils/services/marshall-bands.util';

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

    const { higherBand, lowerBand } = getMarshallBandsByDnit(dnitBand);
    const dnitBands = { higher: higherBand, lower: lowerBand };

    const table_data = await this.granulometryComposition_Service.getGranulometryData(aggregates);

    return {
      data: {
        dnitBands,
        table_data,
        project: [],
        graphData: [],
      },
      success: true,
    };
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

    const { higherBand, lowerBand } = getBandsByType(dnitBands);

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

 async saveVolumetricParametersData(
    body: SaveVolumetricParametersRequestDTO, 
    userId: string
  ): Promise<{ success: boolean; error?: { status: number; name: string; message: string } }> {
    try {
      // Chama o primeiro service (que já está tipado)
      const result: SaveVolumetricParametersResponseDTO = 
        await this.volumetricParameters_Service.saveVolumetricParametersData(body, userId);

      return { success: result.success };
    } catch (error) {
      // Mantém seu handleError original
      handleError(error, 'error on save step 6 data of marshall dosage');
          
      const { status, name, message } = error;
      return { 
        success: false, 
        error: { status, message, name } 
      };
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