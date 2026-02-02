import { Response } from 'express';
import { AngularityService } from "../service";
import { Calc_ANGULARITY_Dto, Calc_ANGULARITY_Out } from "../dto/calc.angularity.dto";
import { AngularityInitDto } from "../dto/angularity-init.dto";
export declare class AngularityController {
    private readonly angularityService;
    private logger;
    constructor(angularityService: AngularityService);
    verifyInitAngularity(response: Response, body: AngularityInitDto): Promise<Response<any, Record<string, any>>>;
    calculateAngularity(body: Calc_ANGULARITY_Dto): Promise<{
        success: boolean;
        result: Calc_ANGULARITY_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_ANGULARITY_Dto & Calc_ANGULARITY_Out): Promise<Response<any, Record<string, any>>>;
}
