import { Calc_AsphaltGranulometry_Dto, Calc_AsphaltGranulometry_Out } from "../dto/asphalt.calc.granulometry.dto";
import { AsphaltGranulometryInitDto } from "../dto/asphalt.granulometry-init.dto";
import { AsphaltGranulometryRepository } from "../repository";
import { GeneralData_AsphaltGranulometry_Service } from "./general-data.granulometry.service";
import { Calc_AsphaltGranulometry_Service } from "./calc.granulometry.service";
export declare class AsphaltGranulometryService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly Granulometry_Repository;
    private logger;
    constructor(generalData_Service: GeneralData_AsphaltGranulometry_Service, calc_Service: Calc_AsphaltGranulometry_Service, Granulometry_Repository: AsphaltGranulometryRepository);
    verifyInitGranulometry(body: AsphaltGranulometryInitDto): Promise<{
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
    calculateGranulometry(body: Calc_AsphaltGranulometry_Dto): Promise<{
        success: boolean;
        result: Calc_AsphaltGranulometry_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_AsphaltGranulometry_Dto & Calc_AsphaltGranulometry_Out): Promise<{
        success: boolean;
        data: import("../schemas").AsphaltGranulometry;
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
    getAllEssaysByUser(userId: string): Promise<import("../schemas").AsphaltGranulometry[] | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    getEssaysByMaterialId(materialId: string, page?: number, limit?: number): Promise<{
        success: boolean;
        data: import("../schemas").AsphaltGranulometry[];
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
}
