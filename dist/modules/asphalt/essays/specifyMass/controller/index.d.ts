import { Response } from 'express';
import { SpecifyMassService } from "../service";
import { Calc_SPECIFYMASS_Dto, Calc_SPECIFYMASS_Out } from "../dto/calc.specifyMass.dto";
import { SpecifyMassInitDto } from "../dto/specifyMass-init.dto";
export declare class SpecifyMassController {
    private readonly specifyMassService;
    private logger;
    constructor(specifyMassService: SpecifyMassService);
    verifyInitSpecifyMass(response: Response, body: SpecifyMassInitDto): Promise<Response<any, Record<string, any>>>;
    calculateSpecifyMass(body: Calc_SPECIFYMASS_Dto): Promise<{
        success: boolean;
        result: Calc_SPECIFYMASS_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_SPECIFYMASS_Dto & Calc_SPECIFYMASS_Out): Promise<Response<any, Record<string, any>>>;
}
