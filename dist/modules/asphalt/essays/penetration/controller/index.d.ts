import { Response } from 'express';
import { Calc_Penetration_Dto, Calc_Penetration_Out } from "../dto/calc.penetration.dto";
import { PenetrationInitDto } from "../dto/penetration-init.dto";
import { PenetrationService } from "../service";
export declare class PenetrationController {
    private readonly penetrationService;
    private logger;
    constructor(penetrationService: PenetrationService);
    verifyInitPenetration(response: Response, body: PenetrationInitDto): Promise<Response<any, Record<string, any>>>;
    calculatePenetration(body: Calc_Penetration_Dto): Promise<{
        success: boolean;
        result: Calc_Penetration_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_Penetration_Dto & Calc_Penetration_Out): Promise<Response<any, Record<string, any>>>;
}
