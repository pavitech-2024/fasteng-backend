import { Response } from 'express';
import { GranulometryService } from '../service';
import { GranulometryInitDto } from '../dto/granulometry-init.dto';
import { Calc_GRANULOMETRY_Dto, Calc_GRANULOMETRY_Out } from '../dto/calc.granulometry.dto';
export declare class GranulometryController {
    private readonly granulometryService;
    private logger;
    constructor(granulometryService: GranulometryService);
    verifyInitGranulometry(response: Response, body: GranulometryInitDto): Promise<Response<any, Record<string, any>>>;
    calculateGranulometry(body: Calc_GRANULOMETRY_Dto): Promise<{
        success: boolean;
        result: Calc_GRANULOMETRY_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_GRANULOMETRY_Dto & Calc_GRANULOMETRY_Out): Promise<Response<any, Record<string, any>>>;
    getGranulometryBySampleId(response: Response, sample_id: string): Promise<Response<any, Record<string, any>>>;
}
