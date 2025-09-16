import { ConcreteRtInitDto } from '../dto/concretert-init.dto';
import { ConcreteRtService } from '../service';
import { Response } from 'express';
import { Calc_Concrete_RT_Dto, Calc_Concrete_RT_Out } from '../dto/calc.rt.dto';
export declare class ConcreteRtController {
    private readonly concreteRtService;
    private logger;
    constructor(concreteRtService: ConcreteRtService);
    verifyInitConcreteRt(response: Response, body: ConcreteRtInitDto): Promise<Response<any, Record<string, any>>>;
    calculateConcreteRt(body: Calc_Concrete_RT_Dto): Promise<{
        success: boolean;
        result: any;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveConcreteEssay(response: Response, body: Calc_Concrete_RT_Dto & Calc_Concrete_RT_Out): Promise<Response<any, Record<string, any>>>;
}
