import { Calc_Ddui_Dto, Calc_Ddui_Out } from "../dto/calc-ddui.dto";
import { DduiInitDto } from "../dto/init-ddui.dto";
import { DduiRepository } from "../repository";
import { Calc_Ddui_Service } from "./calc-ddui.service";
import { GeneralData_Ddui_Service } from "./general-data.ddui.service";
export declare class DduiService {
    private readonly generalData_Service;
    private readonly ddui_Repository;
    private readonly calc_Service;
    constructor(generalData_Service: GeneralData_Ddui_Service, ddui_Repository: DduiRepository, calc_Service: Calc_Ddui_Service);
    verifyInitDdui(body: DduiInitDto): Promise<{
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
    calculateDdui(body: Calc_Ddui_Dto): Promise<{
        success: boolean;
        result: Calc_Ddui_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_Ddui_Dto & Calc_Ddui_Out): Promise<{
        success: boolean;
        data: import("../schemas").Ddui;
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
