import { Calc_SandEquivalent_Dto, Calc_SandEquivalent_Out } from "../dto/calc-sandEquivalent.dto";
import { SandEquivalentInitDto } from "../dto/init-sandEquivalent.dto";
import { Response } from 'express';
import { SandEquivalentService } from "../service";
export declare class SandEquivalentController {
    private readonly sandEquivalentService;
    private logger;
    constructor(sandEquivalentService: SandEquivalentService);
    verifyInitSandEquivalent(response: Response, body: SandEquivalentInitDto): Promise<Response<any, Record<string, any>>>;
    calculateSandEquivalent(body: Calc_SandEquivalent_Dto): Promise<{
        success: boolean;
        result: Calc_SandEquivalent_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_SandEquivalent_Dto & Calc_SandEquivalent_Out): Promise<Response<any, Record<string, any>>>;
}
