import { GeneralData_Marshall_Service } from "./general-data.marshall.service";
import { Marshall } from "../schemas";
import { MarshallRepository } from '../repository/index';
import { MarshallGeneralDataDTO } from "../dto/marshal-general-data.dto";
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
import { SaveStep3DTO, SaveStep4DTO, SaveStep7DTO, SaveStep8DTO, SaveStepDTO } from "../dto/save-step.dto";
import { Step3Result } from "../types/step-data.type";
import { SaveMarshallDosageDTO } from "../dto/binder-trial-data.dto";
import { CalculateStep3DTO } from "../dto/calculate-step-5.dto";
export declare class MarshallService {
    private readonly marshall_repository;
    private readonly generalData_Service;
    private readonly baseMarshallService;
    private readonly granulometryComposition_Service;
    private readonly setBinderTrial_Service;
    private readonly maximumMixtureDensity_Service;
    private readonly volumetricParameters_Service;
    private readonly optimumBinder_Service;
    private readonly confirmCompression_Service;
    private logger;
    constructor(marshall_repository: MarshallRepository, generalData_Service: GeneralData_Marshall_Service, baseMarshallService: BaseMarshallService, granulometryComposition_Service: GranulometryComposition_Marshall_Service, setBinderTrial_Service: SetBinderTrial_Marshall_Service, maximumMixtureDensity_Service: MaximumMixtureDensity_Marshall_Service, volumetricParameters_Service: VolumetricParameters_Marshall_Service, optimumBinder_Service: OptimumBinderContent_Marshall_Service, confirmCompression_Service: ConfirmCompression_Marshall_Service);
    saveStepData(body: SaveStepDTO): Promise<{
        success: boolean;
        error?: any;
    }>;
    getAllDosages(userId: string): Promise<Marshall[]>;
    verifyInitMarshall(body: MarshallGeneralDataDTO, userId: string): Promise<{
        success: boolean;
        dosage: Marshall;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    getDosageById(dosageId: string): Promise<{
        dosage: import("mongoose").Document<unknown, {}, Marshall> & Marshall & Required<{
            _id: string;
        }>;
        success: boolean;
        materials?: undefined;
        error?: undefined;
    } | {
        materials: any[];
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
        dosage?: undefined;
    }>;
    getStep3Data(body: MarshallStep3Dto): Promise<{
        data: {
            dnitBands: {
                higher: any[];
                lower: any[];
            };
            table_data: {
                table_column_headers: string[];
                table_rows: any[];
            };
            project: any[];
            graphData: any[];
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateStep3Data(body: CalculateStep3DTO): Promise<Step3Result>;
    saveStep3Data(body: SaveStep3DTO, userId: string): Promise<{
        success: boolean;
        error?: any;
    }>;
    calculateStep4Data(body: any): Promise<{
        data: {
            percentsOfDosage: import("../types/marshall.types").TrialItem[][];
            bandsOfTemperatures: import("../dto/binder-trial-data.dto").BandsOfTemperaturesDTO;
            newPercentOfDosage: number[][];
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveStep4Data(body: SaveStep4DTO, userId: string): Promise<{
        success: boolean;
        error?: any;
    }>;
    getIndexesOfMissesSpecificGravity(dto: GetIndexesOfMissesSpecificGravityDTO): Promise<{
        data: any;
        success: boolean;
        error?: any;
    }>;
    calculateDmtData(dto: CalculateDmtDataDTO): Promise<{
        data: any;
        success: boolean;
        error?: any;
    }>;
    calculateGmmData(dto: CalculateGmmDataDTO): Promise<{
        data: any;
        success: boolean;
        error?: any;
    }>;
    calculateRiceTest(dto: CalculateRiceTestDTO): Promise<{
        data: any;
        success: boolean;
        error?: any;
    }>;
    saveMistureMaximumDensityData(dto: SaveMaximumMixtureDensityDataDTO, userId: string): Promise<{
        success: boolean;
        error?: any;
    }>;
    setVolumetricParameters(body: any): Promise<{
        data: {
            volumetricParameters: {
                volumetricParameters: any[];
                pointsOfCurveDosageRBV: any[];
                pointsOfCurveDosageVv: any[];
            };
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveVolumetricParametersData(body: any, userId: string): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    setOptimumBinderContentData(body: any): Promise<{
        data: {
            optimumBinder: {
                rbv: string[][];
                vv: string[][];
                sg: string[][];
                gmb: string[][];
                stability: string[][];
                vam: string[][];
            };
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    setOptimumBinderContentDosageGraph(body: any): Promise<{
        data: {
            optimumBinderDosageGraph: {
                pointsOfCurveDosage: any[];
                optimumContent: number;
                confirmedPercentsOfDosage: any;
                curveRBV: {
                    a: any;
                    b: any;
                };
                curveVv: {
                    a: any;
                    b: any;
                };
            };
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    getOptimumBinderExpectedParameters(body: any): Promise<{
        data: {
            expectedParameters: {
                Vv: any;
                RBV: any;
                Vam: number;
                Gmb: number;
                newMaxSpecificGravity: any;
            };
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveStep7Data(body: SaveStep7DTO, userId: string): Promise<{
        success: boolean;
        error?: any;
    }>;
    confirmSpecificGravity(body: any): Promise<{
        data: {
            confirmedSpecificGravity: {
                result: number;
                type: "DMT" | "GMM";
            };
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    confirmVolumetricParameters(body: any): Promise<{
        data: {
            confirmedVolumetricParameters: {
                valuesOfVolumetricParameters: any;
                asphaltContent: any;
                quantitative: any;
                values: {
                    volumeVoids: number;
                    apparentBulkSpecificGravity: number;
                    voidsFilledAsphalt: number;
                    aggregateVolumeVoids: number;
                    ratioBitumenVoid: number;
                    stability: number;
                    fluency: number;
                    indirectTensileStrength: number;
                };
            };
        };
        success: boolean;
        error?: undefined;
    } | {
        data: any;
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveStep8Data(body: SaveStep8DTO, userId: string): Promise<{
        success: boolean;
        error?: any;
    }>;
    saveMarshallDosage(body: SaveMarshallDosageDTO, userId: string): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    deleteMarshallDosage(id: string): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
}
