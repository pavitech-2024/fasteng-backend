import { Response } from 'express';
import { Calc_ViscosityRotational_Dto, Calc_ViscosityRotational_Out } from '../dto/calc-viscosityRotational.dto';
import { ViscosityRotationalInitDto } from '../dto/init-viscosityRotational.dto';
import { ViscosityRotationalService } from '../service/viscosityRotational.service';
export declare class ViscosityRotationalController {
    private readonly viscosityRotationalService;
    private logger;
    constructor(viscosityRotationalService: ViscosityRotationalService);
    verifyInitViscosityRotational(response: Response, body: ViscosityRotationalInitDto): Promise<Response<any, Record<string, any>>>;
    calculateViscosityRotational(body: Calc_ViscosityRotational_Dto): Promise<{
        success: boolean;
        result: Calc_ViscosityRotational_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_ViscosityRotational_Dto & Calc_ViscosityRotational_Out): Promise<Response<any, Record<string, any>>>;
}
