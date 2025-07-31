import { AdhesivenessRepository } from "../repository";
import { AdhesivenessInitDto } from "../dto/adhesiveness-init.dto";
import { Calc_Adhesiveness_Service } from "./calc.adhesiveness.service";
import { GeneralData_Adhesiveness_Service } from "./general-data.adhesiveness.service";
import { Calc_Adhesiveness_Dto, Calc_Adhesiveness_Out } from "../dto/calc.adhesiveness.dto";
export declare class AdhesivenessService {
    private readonly generalData_Service;
    private readonly adhesiveness_Repository;
    private readonly calc_Service;
    constructor(generalData_Service: GeneralData_Adhesiveness_Service, adhesiveness_Repository: AdhesivenessRepository, calc_Service: Calc_Adhesiveness_Service);
    verifyInitAdhesiveness(body: AdhesivenessInitDto): Promise<{
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
    calculateAdhesiveness(body: Calc_Adhesiveness_Dto): Promise<{
        success: boolean;
        result: Calc_Adhesiveness_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_Adhesiveness_Dto & Calc_Adhesiveness_Out): Promise<{
        success: boolean;
        data: import("../schemas").Adhesiveness;
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
