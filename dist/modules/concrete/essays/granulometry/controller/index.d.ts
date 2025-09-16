import { Response } from 'express';
import { ConcreteGranulometryService } from '../service';
import { ConcreteGranulometryInitDto } from '../dto/concretegranulometry-init.dto';
import { Calc_CONCRETEGRANULOMETRY_Dto, Calc_CONCRETEGRANULOMETRY_Out } from '../dto/calc.granulometry.dto';
export declare class ConcreteGranulometryController {
    private readonly concretegranulometryService;
    private logger;
    constructor(concretegranulometryService: ConcreteGranulometryService);
    verifyInitConcreteGranulometry(response: Response, body: ConcreteGranulometryInitDto): Promise<Response<any, Record<string, any>>>;
    calculateConcreteGranulometry(body: Calc_CONCRETEGRANULOMETRY_Dto): Promise<{
        success: boolean;
        result: Calc_CONCRETEGRANULOMETRY_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveConcreteEssay(response: Response, body: Calc_CONCRETEGRANULOMETRY_Dto & Calc_CONCRETEGRANULOMETRY_Out): Promise<Response<any, Record<string, any>>>;
}
