import { Response } from 'express';
import { FlashPointService } from "../service";
import { Calc_FLASHPOINT_Dto, Calc_FLASHPOINT_Out } from "../dto/calc.flashPoint.dto";
import { FlashPointInitDto } from "../dto/flashPoint-init.dto";
export declare class FlashPointController {
    private readonly flashPointService;
    private logger;
    constructor(flashPointService: FlashPointService);
    verifyInitFlashPoint(response: Response, body: FlashPointInitDto): Promise<Response<any, Record<string, any>>>;
    calculateFlashPoint(body: Calc_FLASHPOINT_Dto): Promise<{
        success: boolean;
        result: Calc_FLASHPOINT_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_FLASHPOINT_Dto & Calc_FLASHPOINT_Out): Promise<Response<any, Record<string, any>>>;
}
