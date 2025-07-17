import { Calc_Fwd_Dto, Calc_Fwd_Out } from '../dto/calc-fwd.dto';
import { Calc_Fwd_Service } from './calc.fwd.service';
import { GeneralData_Fwd_Service } from './general-data.fwd.service';
import { FwdInitDto } from '../dto/init-fwd.dto';
import { FwdRepository } from '../repository';
export declare class FwdService {
    private readonly generalData_Service;
    private readonly fwd_Repository;
    private readonly calc_Service;
    constructor(generalData_Service: GeneralData_Fwd_Service, fwd_Repository: FwdRepository, calc_Service: Calc_Fwd_Service);
    verifyInitFwd(body: FwdInitDto): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateFwd(body: Calc_Fwd_Dto): Promise<{
        success: boolean;
        result: Calc_Fwd_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_Fwd_Dto & Calc_Fwd_Out): Promise<{
        success: boolean;
        data: import("../schema").Fwd;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
        data?: undefined;
    }>;
}
