import { FwdService } from '../services';
import { FwdInitDto } from '../dto/init-fwd.dto';
import { Calc_Fwd_Dto, Calc_Fwd_Out } from '../dto/calc-fwd.dto';
import { Response } from 'express';
export declare class FwdController {
    private readonly fwdService;
    private logger;
    constructor(fwdService: FwdService);
    verifyInitFwd(response: Response, body: FwdInitDto): Promise<Response<any, Record<string, any>>>;
    calculateFwd(body: Calc_Fwd_Dto): Promise<{
        success: boolean;
        result: Calc_Fwd_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_Fwd_Dto & Calc_Fwd_Out): Promise<Response<any, Record<string, any>>>;
}
