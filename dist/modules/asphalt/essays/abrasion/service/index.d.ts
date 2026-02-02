import { AbrasionRepository } from "../repository";
import { AbrasionInitDto } from "../dto/abrasion-init.dto";
import { Calc_Abrasion_Dto, Calc_Abrasion_Out } from "../dto/calc-abrasion.dto";
import { Calc_Abrasion_Service } from "./calc.abrasion.service";
import { GeneralData_Abrasion_Service } from "./general-data.abrasion.service";
export declare class AbrasionService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly Abrasion_Repository;
    constructor(generalData_Service: GeneralData_Abrasion_Service, calc_Service: Calc_Abrasion_Service, Abrasion_Repository: AbrasionRepository);
    verifyInitAbrasion(body: AbrasionInitDto): Promise<{
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
    calculateAbrasion(body: Calc_Abrasion_Dto): Promise<{
        success: boolean;
        result: Calc_Abrasion_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_Abrasion_Dto & Calc_Abrasion_Out): Promise<{
        success: boolean;
        data: import("../schemas").Abrasion;
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
