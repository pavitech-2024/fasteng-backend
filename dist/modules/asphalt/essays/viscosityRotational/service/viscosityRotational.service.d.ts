import { Calc_ViscosityRotational_Dto, Calc_ViscosityRotational_Out } from '../dto/calc-viscosityRotational.dto';
import { ViscosityRotationalInitDto } from '../dto/init-viscosityRotational.dto';
import { ViscosityRotationalRepository } from '../repository';
import { Calc_ViscosityRotational_Service } from './calc.viscosityRotational.service';
import { GeneralData_ViscosityRotational_Service } from './general-data.viscosityRotational.service';
export declare class ViscosityRotationalService {
    private readonly generalData_Service;
    private readonly viscosityRotational_Repository;
    private readonly calc_Service;
    constructor(generalData_Service: GeneralData_ViscosityRotational_Service, viscosityRotational_Repository: ViscosityRotationalRepository, calc_Service: Calc_ViscosityRotational_Service);
    verifyInitViscosityRotational(body: ViscosityRotationalInitDto): Promise<{
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
    saveEssay(body: Calc_ViscosityRotational_Dto & Calc_ViscosityRotational_Out): Promise<{
        success: boolean;
        data: import("../schemas").ViscosityRotational;
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
