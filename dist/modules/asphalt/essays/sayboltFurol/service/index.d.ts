import { Calc_SayboltFurol_Dto, Calc_SayboltFurol_Out } from "../dto/calc-sayboltFurol.dto";
import { SayboltFurolInitDto } from "../dto/init-sayboltFurol.dto";
import { SayboltFurolRepository } from "../repository";
import { Calc_SayboltFurol_Service } from "./calc.sayboltFurol.service";
import { GeneralData_SayboltFurol_Service } from "./general-data.sayboltFurol.service";
export declare class SayboltFurolService {
    private readonly generalData_Service;
    private readonly sayboltFurol_Repository;
    private readonly calc_Service;
    constructor(generalData_Service: GeneralData_SayboltFurol_Service, sayboltFurol_Repository: SayboltFurolRepository, calc_Service: Calc_SayboltFurol_Service);
    verifyInitSayboltFurol(body: SayboltFurolInitDto): Promise<{
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
    calculateSayboltFurol(body: Calc_SayboltFurol_Dto): Promise<{
        success: boolean;
        result: Calc_SayboltFurol_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_SayboltFurol_Dto & Calc_SayboltFurol_Out): Promise<{
        success: boolean;
        data: import("../schemas").SayboltFurol;
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
