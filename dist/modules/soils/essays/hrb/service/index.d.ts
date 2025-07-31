import { GeneralData_HRB_Service } from './general-data.hrb.service';
import { HrbInitDto } from '../dto/hrb-init.dto';
import { Calc_HRB_Dto, Calc_HRB_Out } from '../dto/calc.hrb.dto';
import { Calc_HRB_Service } from './calc.hrb.service';
import { HrbRepository } from '../repository';
export declare class HrbService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly Hrb_Repository;
    constructor(generalData_Service: GeneralData_HRB_Service, calc_Service: Calc_HRB_Service, Hrb_Repository: HrbRepository);
    verifyInitHrb(body: HrbInitDto): Promise<{
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
    calculateHrb(body: Calc_HRB_Dto): Promise<{
        success: boolean;
        result: Calc_HRB_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_HRB_Dto & Calc_HRB_Out): Promise<{
        success: boolean;
        data: import("../schemas").Hrb;
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
