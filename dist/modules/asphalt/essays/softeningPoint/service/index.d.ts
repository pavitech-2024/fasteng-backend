import { Calc_SofteningPoint_Dto, Calc_SofteningPoint_Out } from "../dto/calc-softeningPoint.dto";
import { SofteningPointInitDto } from "../dto/init-softeningPoint.dto";
import { SofteningPointRepository } from "../repository";
import { Calc_SofteningPoint_Service } from "./calc-softeningPoint.softeningPoint.service";
import { GeneralData_SofteningPoint_Service } from "./general-data.softeningPoint.service";
export declare class SofteningPointService {
    private readonly generalData_Service;
    private readonly softeningPoint_Repository;
    private readonly calc_Service;
    constructor(generalData_Service: GeneralData_SofteningPoint_Service, softeningPoint_Repository: SofteningPointRepository, calc_Service: Calc_SofteningPoint_Service);
    verifyInitSofteningPoint(body: SofteningPointInitDto): Promise<{
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
    calculateSofteningPoint(body: Calc_SofteningPoint_Dto): Promise<{
        success: boolean;
        result: Calc_SofteningPoint_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_SofteningPoint_Dto & Calc_SofteningPoint_Out): Promise<{
        success: boolean;
        data: import("../schemas").SofteningPoint;
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
