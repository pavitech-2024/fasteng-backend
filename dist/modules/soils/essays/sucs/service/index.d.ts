import { GeneralData_SUCS_Service } from './general-data.sucs.service';
import { SucsInitDto } from '../dto/sucs-init.dto';
import { Calc_SUCS_Dto, Calc_SUCS_Out } from '../dto/calc.sucs.dto';
import { SucsRepository } from '../repository';
import { Calc_SUCS_Service } from './calc.sucs.service';
export declare class SucsService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly Sucs_Repository;
    constructor(generalData_Service: GeneralData_SUCS_Service, calc_Service: Calc_SUCS_Service, Sucs_Repository: SucsRepository);
    private logger;
    verifyInitSucs(body: SucsInitDto): Promise<{
        result: boolean;
        error?: undefined;
    } | {
        result: {
            success: boolean;
            granulometry: any[];
        };
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateSucs(body: Calc_SUCS_Dto): Promise<{
        success: boolean;
        result: Calc_SUCS_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_SUCS_Dto & Calc_SUCS_Out): Promise<{
        success: boolean;
        data: import("../schemas").Sucs;
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
