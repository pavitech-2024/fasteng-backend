import { Calc_Penetration_Dto, Calc_Penetration_Out } from "../dto/calc.penetration.dto";
import { PenetrationInitDto } from "../dto/penetration-init.dto";
import { PenetrationRepository } from "../repository";
import { GeneralData_Penetration_Service } from "./general-data.penetration.service";
import { Calc_Penetration_Service } from "./calc.penetration.service";
export declare class PenetrationService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly Penetration_Repository;
    constructor(generalData_Service: GeneralData_Penetration_Service, calc_Service: Calc_Penetration_Service, Penetration_Repository: PenetrationRepository);
    verifyInitPenetration(body: PenetrationInitDto): Promise<{
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
    calculatePenetration(body: Calc_Penetration_Dto): Promise<{
        success: boolean;
        result: Calc_Penetration_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_Penetration_Dto & Calc_Penetration_Out): Promise<{
        success: boolean;
        data: import("../schemas").Penetration;
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
