import { Response } from 'express';
import { SucsService } from '../service/index';
import { SucsInitDto } from '../dto/sucs-init.dto';
import { Calc_SUCS_Dto, Calc_SUCS_Out } from '../dto/calc.sucs.dto';
export declare class SucsController {
    private readonly sucsService;
    private logger;
    constructor(sucsService: SucsService);
    verifyInitSucs(response: Response, body: SucsInitDto): Promise<Response<any, Record<string, any>>>;
    calculateSucs(body: Calc_SUCS_Dto): Promise<{
        success: boolean;
        result: Calc_SUCS_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_SUCS_Dto & Calc_SUCS_Out): Promise<Response<any, Record<string, any>>>;
}
