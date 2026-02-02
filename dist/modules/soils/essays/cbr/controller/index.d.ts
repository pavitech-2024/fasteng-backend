import { CbrService } from '../service';
import { CbrInitDto } from '../dto/cbr-init.dto';
import { Response } from 'express';
import { Calc_CBR_Dto, Calc_CBR_Out } from '../dto/calc.cbr.dto';
export declare class CbrController {
    private readonly cbrService;
    private logger;
    constructor(cbrService: CbrService);
    verifyInitCbr(response: Response, body: CbrInitDto): Promise<Response<any, Record<string, any>>>;
    calculateCbr(body: Calc_CBR_Dto): Promise<{
        success: boolean;
        result: Calc_CBR_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_CBR_Dto & Calc_CBR_Out): Promise<Response<any, Record<string, any>>>;
}
