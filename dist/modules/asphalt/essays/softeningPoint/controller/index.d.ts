import { Calc_SofteningPoint_Dto, Calc_SofteningPoint_Out } from "../dto/calc-softeningPoint.dto";
import { SofteningPointInitDto } from "../dto/init-softeningPoint.dto";
import { Response } from 'express';
import { SofteningPointService } from "../service";
export declare class SofteningPointController {
    private readonly softeningPointService;
    private logger;
    constructor(softeningPointService: SofteningPointService);
    verifyInitSofteningPoint(response: Response, body: SofteningPointInitDto): Promise<Response<any, Record<string, any>>>;
    calculateSofteningPoint(body: Calc_SofteningPoint_Dto): Promise<{
        success: boolean;
        result: Calc_SofteningPoint_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_SofteningPoint_Dto & Calc_SofteningPoint_Out): Promise<Response<any, Record<string, any>>>;
}
