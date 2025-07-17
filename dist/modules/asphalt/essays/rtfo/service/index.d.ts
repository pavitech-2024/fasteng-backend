import { Calc_Rtfo_Dto, Calc_Rtfo_Out } from "../dto/calc-rtfo.dto";
import { RtfoInitDto } from "../dto/rtfo-init.dto";
import { RtfoRepository } from "../repository";
import { GeneralData_Rtfo_Service } from "./general-data.rtfo.service";
import { Calc_Rtfo_Service } from "./calc.rtfo.service";
export declare class RtfoService {
    private readonly generalData_Service;
    private readonly rtfo_Repository;
    private readonly calc_Service;
    constructor(generalData_Service: GeneralData_Rtfo_Service, rtfo_Repository: RtfoRepository, calc_Service: Calc_Rtfo_Service);
    verifyInitRtfo(body: RtfoInitDto): Promise<{
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
    calculateRtfo(body: Calc_Rtfo_Dto): Promise<{
        success: boolean;
        result: Calc_Rtfo_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_Rtfo_Dto & Calc_Rtfo_Out): Promise<{
        success: boolean;
        data: import("../schemas").Rtfo;
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
