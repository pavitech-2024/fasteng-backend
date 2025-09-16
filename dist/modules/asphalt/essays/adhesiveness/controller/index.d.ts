import { Response } from 'express';
import { AdhesivenessInitDto } from "../dto/adhesiveness-init.dto";
import { AdhesivenessService } from "../service";
import { Calc_Adhesiveness_Dto, Calc_Adhesiveness_Out } from "../dto/calc.adhesiveness.dto";
export declare class AdhesivenessController {
    private readonly adhesivenessService;
    private logger;
    constructor(adhesivenessService: AdhesivenessService);
    verifyInitAdhesiveness(response: Response, body: AdhesivenessInitDto): Promise<Response<any, Record<string, any>>>;
    calculateAdhesiveness(body: Calc_Adhesiveness_Dto): Promise<{
        success: boolean;
        result: Calc_Adhesiveness_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_Adhesiveness_Dto & Calc_Adhesiveness_Out): Promise<Response<any, Record<string, any>>>;
}
