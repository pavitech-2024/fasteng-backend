import { Response } from 'express';
import { DuctilityService } from "../service";
import { Calc_DUCTILITY_Dto, Calc_DUCTILITY_Out } from "../dto/calc.ductility.dto";
import { DuctilityInitDto } from "../dto/ductility-init.dto";
export declare class DuctilityController {
    private readonly ductilityService;
    private logger;
    constructor(ductilityService: DuctilityService);
    verifyInitDuctility(response: Response, body: DuctilityInitDto): Promise<Response<any, Record<string, any>>>;
    calculateDuctility(body: Calc_DUCTILITY_Dto): Promise<{
        success: boolean;
        result: Calc_DUCTILITY_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_DUCTILITY_Dto & Calc_DUCTILITY_Out): Promise<Response<any, Record<string, any>>>;
}
