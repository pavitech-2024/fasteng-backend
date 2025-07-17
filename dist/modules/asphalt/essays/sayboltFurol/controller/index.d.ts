import { Calc_SayboltFurol_Dto, Calc_SayboltFurol_Out } from "../dto/calc-sayboltFurol.dto";
import { SayboltFurolInitDto } from "../dto/init-sayboltFurol.dto";
import { Response } from 'express';
import { SayboltFurolService } from "../service";
export declare class SayboltFurolController {
    private readonly sayboltFurolService;
    private logger;
    constructor(sayboltFurolService: SayboltFurolService);
    verifyInitSayboltFurol(response: Response, body: SayboltFurolInitDto): Promise<Response<any, Record<string, any>>>;
    calculateSayboltFurol(body: Calc_SayboltFurol_Dto): Promise<{
        success: boolean;
        result: Calc_SayboltFurol_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_SayboltFurol_Dto & Calc_SayboltFurol_Out): Promise<Response<any, Record<string, any>>>;
}
