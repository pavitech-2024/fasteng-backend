import { GeneralData_ABCP_Service } from "./general-data.abcp.service";
import { MaterialSelection_ABCP_Service } from "./material-selection.abcp.service";
import { EssaySelection_ABCP_Service } from './essay-selection.abcp.service';
import { ABCPEssaySelectionDto } from "../dto/abcp-essay-selection.dto";
import { Calc_ABCP_Dto, Calc_ABCP_Out, SaveAbcpDto } from "../dto/abcp-calculate-results.dto";
import { Calculate_ABCP_Results_Service } from "./calc-abcp.service";
import { ABCPRepository } from "../repository";
import { ABCP, ABCPDocument } from "../schemas";
import { InsertParams_ABCP_Service } from "./insert-params.abcp.service";
import { Model } from "mongoose";
export declare class ABCPService {
    private abcpModel;
    private readonly generalData_Service;
    private readonly materialSelection_Service;
    private readonly essaySelection_Service;
    private readonly insertParams_Service;
    private readonly calculateResults_Service;
    private readonly ABCPRepository;
    private logger;
    constructor(abcpModel: Model<ABCPDocument>, generalData_Service: GeneralData_ABCP_Service, materialSelection_Service: MaterialSelection_ABCP_Service, essaySelection_Service: EssaySelection_ABCP_Service, insertParams_Service: InsertParams_ABCP_Service, calculateResults_Service: Calculate_ABCP_Results_Service, ABCPRepository: ABCPRepository);
    verifyInitABCP(body: any, userId: string): Promise<{
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
    getUserMaterials(userId: string): Promise<{
        materials: import("../../../materials/schemas").Material[];
        success: boolean;
        error?: undefined;
    } | {
        materials: any[];
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveMaterialSelectionStep(body: any, userId: string): Promise<{
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
    getEssaysByMaterials(data: ABCPEssaySelectionDto): Promise<{
        essays: {
            cementData: import("../../../materials/schemas").Material;
            coarseAggregateData: {
                _id: string;
                name: string;
                granulometrys: import("../../../essays/granulometry/schemas").Granulometry[];
                unit_masses: import("../../../essays/unitMass/schemas").UnitMass[];
            };
            fineAggregateData: {
                _id: string;
                name: string;
                granulometrys: import("../../../essays/granulometry/schemas").Granulometry[];
            };
        };
        success: boolean;
        error?: undefined;
    } | {
        essays: any[];
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssaySelectionStep(body: any, userId: string): Promise<{
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
    saveInsertParamsStep(body: any, userId: string): Promise<{
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
    getAllDosages(userId: string): Promise<ABCP[]>;
    getDosageById(dosageId: string): Promise<ABCP>;
    calculateAbcpDosage(data: Calc_ABCP_Dto): Promise<{
        success: boolean;
        result: Calc_ABCP_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveDosage(body: SaveAbcpDto): Promise<{
        success: boolean;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
        data?: undefined;
    }>;
    deleteDosage(dosage_id: string): Promise<any>;
}
