import { MarshallService } from '../service';
import { MarshallGeneralDataDTO } from '../dto/marshal-general-data.dto';
import { SaveMarshallDosageDTO } from '../dto/binder-trial-data.dto';
import { CalculateDmtDataDTO } from '../dto/calculate-dmt-data.dto';
import { CalculateGmmDataDTO } from '../dto/calculate-gmm-data.dto';
import { SaveStepDTO } from '../dto/save-step.dto';
import { GetIndexesOfMissesSpecificGravityDTO } from '../dto/get-indexes-of-misses-specific-gravity.dto';
import { SaveStep3DTO, SaveStep4DTO, SaveStep7DTO, SaveStep8DTO } from '../dto/save-step.dto';
import { MarshallStep3Dto } from '../dto/step-3-marshall.dto';
import { CalculateStep3DTO } from '../dto/calculate-step-5.dto';
import { Step3Result } from '../types/step-data.type';
import { CalculateRiceTestDTO as CalculateRiceTestDTONew } from '../dto/calculate-rice-test.dto';
import { SaveMaximumMixtureDensityDataDTO } from '../dto/save-maximum-mixture-density-data.dto';
import { SaveVolumetricParametersRequestDTO } from '../dto/volumetric-params-data.dto';
export declare class MarshallController {
    private readonly marshallService;
    private logger;
    constructor(marshallService: MarshallService);
    getAllByUserId(userId: string): Promise<import("../schemas").Marshall[]>;
    getDosageById(dosageId: string): Promise<{
        dosage: import("mongoose").Document<unknown, {}, import("../schemas").Marshall> & import("../schemas").Marshall & Required<{
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
    verifyInitMarshall(body: MarshallGeneralDataDTO, userId: string): Promise<{
        success: boolean;
        dosage: import("../schemas").Marshall;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    getIndexesOfMissesSpecificGravity(aggregates: GetIndexesOfMissesSpecificGravityDTO): Promise<{
        data: any;
        success: boolean;
        error?: any;
    }>;
    calculateDmtData(body: CalculateDmtDataDTO): Promise<{
        data: any;
        success: boolean;
        error?: any;
    }>;
    calculateGmmData(body: CalculateGmmDataDTO): Promise<{
        data: any;
        success: boolean;
        error?: any;
    }>;
    calculateRiceTest(body: CalculateRiceTestDTONew): Promise<{
        data: any;
        success: boolean;
        error?: any;
    }>;
    saveMarshallDosage(userId: string, body: SaveMarshallDosageDTO): Promise<{
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
    saveGranulometryCompositionStep(userId: string, body: SaveStep3DTO): Promise<{
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
    saveBinderTrialStep(userId: string, body: SaveStep4DTO): Promise<{
        success: boolean;
        error?: any;
    }>;
    saveMaximumMixtureDensityData(userId: string, body: SaveMaximumMixtureDensityDataDTO): Promise<{
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
    saveVolumetricParametersData(userId: string, body: SaveVolumetricParametersRequestDTO): Promise<{
        success: boolean;
        error?: {
            status: number;
            name: string;
            message: string;
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
    saveOptimumBinderContentData(userId: string, body: SaveStep7DTO): Promise<{
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
    saveConfirmationCompressionData(userId: string, body: SaveStep8DTO): Promise<{
        success: boolean;
        error?: any;
    }>;
    saveStepData(body: SaveStepDTO): Promise<{
        success: boolean;
        error?: any;
    }>;
}
