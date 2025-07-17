import { RtcdService } from '../service/rtcd.service';
import { RtcdInitDto } from '../dto/init-rtcd.dto';
import { Calc_Rtcd_Dto, Calc_Rtcd_Out } from '../dto/calc-rtcd.dto';
import { Response } from 'express';
export declare class RtcdController {
    private readonly rtcdService;
    private logger;
    constructor(rtcdService: RtcdService);
    verifyInitRtcd(response: Response, body: RtcdInitDto): Promise<Response<any, Record<string, any>>>;
    calculateRtcd(body: Calc_Rtcd_Dto): Promise<{
        success: boolean;
        result: Calc_Rtcd_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_Rtcd_Dto & Calc_Rtcd_Out): Promise<Response<any, Record<string, any>>>;
}
