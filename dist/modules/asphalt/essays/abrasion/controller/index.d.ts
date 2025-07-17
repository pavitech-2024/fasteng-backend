import { Response } from 'express';
import { AbrasionInitDto } from "../dto/abrasion-init.dto";
import { Calc_Abrasion_Dto, Calc_Abrasion_Out } from "../dto/calc-abrasion.dto";
import { AbrasionService } from "../service";
export declare class AbrasionController {
    private readonly abrasionService;
    private logger;
    constructor(abrasionService: AbrasionService);
    verifyInitAbrasion(response: Response, body: AbrasionInitDto): Promise<Response<any, Record<string, any>>>;
    calculateAbrasion(body: Calc_Abrasion_Dto): Promise<{
        success: boolean;
        result: Calc_Abrasion_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_Abrasion_Dto & Calc_Abrasion_Out): Promise<Response<any, Record<string, any>>>;
}
