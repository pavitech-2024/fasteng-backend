import { Calc_CONCRETERC_Dto, Calc_CONCRETERC_Out } from '../dto/calc.rc.dto';
import { ConcreteRcInitDto } from '../dto/concretert-init.dto';
import { Response } from 'express';
import { ConcreteRcService } from '../service';
export declare class ConcreteRcController {
    private readonly concretercService;
    private logger;
    constructor(concretercService: ConcreteRcService);
    verifyInitConcreteRc(response: Response, body: ConcreteRcInitDto): Promise<Response<any, Record<string, any>>>;
    calculateConcreteRc(body: Calc_CONCRETERC_Dto): Promise<{
        success: boolean;
        result: Calc_CONCRETERC_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveConcreteEssay(response: Response, body: Calc_CONCRETERC_Dto & Calc_CONCRETERC_Out): Promise<Response<any, Record<string, any>>>;
}
