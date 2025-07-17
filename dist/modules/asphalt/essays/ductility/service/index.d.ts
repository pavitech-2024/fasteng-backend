import { DuctilityInitDto } from '../dto/ductility-init.dto';
import { Calc_DUCTILITY_Dto, Calc_DUCTILITY_Out } from '../dto/calc.ductility.dto';
import { DuctilityRepository } from '../repository';
import { Calc_DUCTILITY_Service } from './calc.ductility.service';
import { GeneralData_DUCTILITY_Service } from './general-data.ductility.service';
export declare class DuctilityService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly Ductility_Repository;
    private logger;
    constructor(generalData_Service: GeneralData_DUCTILITY_Service, calc_Service: Calc_DUCTILITY_Service, Ductility_Repository: DuctilityRepository);
    verifyInitDuctility(body: DuctilityInitDto): Promise<{
        result: boolean;
        error?: undefined;
    } | {
        result: {
            success: boolean;
        };
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateDuctility(body: Calc_DUCTILITY_Dto): Promise<{
        success: boolean;
        result: Calc_DUCTILITY_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_DUCTILITY_Dto & Calc_DUCTILITY_Out): Promise<{
        success: boolean;
        data: import("../schemas").Ductility;
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
