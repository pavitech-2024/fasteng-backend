import { Response } from 'express';
import { Calc_Rtfo_Dto, Calc_Rtfo_Out } from "../dto/calc-rtfo.dto";
import { RtfoInitDto } from "../dto/rtfo-init.dto";
import { RtfoService } from "../service";
export declare class RtfoController {
    private readonly rtfoService;
    private logger;
    constructor(rtfoService: RtfoService);
    verifyInitRtfo(response: Response, body: RtfoInitDto): Promise<Response<any, Record<string, any>>>;
    calculateRtfo(body: Calc_Rtfo_Dto): Promise<{
        success: boolean;
        result: Calc_Rtfo_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_Rtfo_Dto & Calc_Rtfo_Out): Promise<Response<any, Record<string, any>>>;
}
