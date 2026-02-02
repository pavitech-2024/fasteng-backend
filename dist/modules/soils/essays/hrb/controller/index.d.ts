import { Response } from 'express';
import { HrbService } from '../service';
import { HrbInitDto } from '../dto/hrb-init.dto';
import { Calc_HRB_Dto, Calc_HRB_Out } from '../dto/calc.hrb.dto';
export declare class HrbController {
    private readonly hrbService;
    private logger;
    constructor(hrbService: HrbService);
    verifyInitCbr(response: Response, body: HrbInitDto): Promise<Response<any, Record<string, any>>>;
    calculateHrb(body: Calc_HRB_Dto): Promise<{
        success: boolean;
        result: Calc_HRB_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_HRB_Dto & Calc_HRB_Out): Promise<Response<any, Record<string, any>>>;
}
