import { Calc_AsphaltGranulometry_Dto, Calc_AsphaltGranulometry_Out } from "../dto/asphalt.calc.granulometry.dto";
import { AsphaltGranulometryService } from "../service";
import { AsphaltGranulometryInitDto } from "../dto/asphalt.granulometry-init.dto";
import { Response } from 'express';
export declare class ControllerController {
}
export declare class AsphaltGranulometryController {
    private readonly asphaltgranulometryService;
    private logger;
    constructor(asphaltgranulometryService: AsphaltGranulometryService);
    verifyInitAsphaltGranulometry(response: Response, body: AsphaltGranulometryInitDto): Promise<Response<any, Record<string, any>>>;
    calculateAsphaltGranulometry(body: Calc_AsphaltGranulometry_Dto): Promise<{
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
    saveAsphaltEssay(response: Response, body: Calc_AsphaltGranulometry_Dto & Calc_AsphaltGranulometry_Out): Promise<Response<any, Record<string, any>>>;
    getEssaysByUser(userId: string): Promise<import("../schemas").AsphaltGranulometry[] | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    getEssaysByMaterial(materialId: string, page?: number, limit?: number): Promise<{
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
