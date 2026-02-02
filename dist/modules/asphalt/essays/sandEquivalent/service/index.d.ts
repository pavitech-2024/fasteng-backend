import { Calc_SandEquivalent_Dto, Calc_SandEquivalent_Out } from "../dto/calc-sandEquivalent.dto";
import { SandEquivalentInitDto } from "../dto/init-sandEquivalent.dto";
import { SandEquivalentRepository } from "../repository";
import { GeneralData_SandEquivalent_Service } from "./general-data.sandEquivalent.service";
import { Calc_SandEquivalent_Service } from "./calc.sandEquivalent.service";
export declare class SandEquivalentService {
    private readonly generalData_Service;
    private readonly sandEquivalent_Repository;
    private readonly calc_Service;
    constructor(generalData_Service: GeneralData_SandEquivalent_Service, sandEquivalent_Repository: SandEquivalentRepository, calc_Service: Calc_SandEquivalent_Service);
    verifyInitSandEquivalent(body: SandEquivalentInitDto): Promise<{
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
    calculateSandEquivalent(body: Calc_SandEquivalent_Dto): Promise<{
        success: boolean;
        result: Calc_SandEquivalent_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_SandEquivalent_Dto & Calc_SandEquivalent_Out): Promise<{
        success: boolean;
        data: import("../schemas").SandEquivalent;
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
