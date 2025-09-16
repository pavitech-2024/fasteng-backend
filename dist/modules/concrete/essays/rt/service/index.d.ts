import { ConcreteRtInitDto } from "../dto/concretert-init.dto";
import { ConcreteRtRepository } from "../repository";
import { GeneralData_CONCRETERT_Service } from "./general-data.rt.service";
import { Calc_ConcreteRt_Service } from "./calc.rt.service";
import { Calc_Concrete_RT_Dto, Calc_Concrete_RT_Out } from "../dto/calc.rt.dto";
export declare class ConcreteRtService {
    private readonly generalData_Service;
    private readonly calc_ConcreteRt_Service;
    private readonly rt_Repository;
    private logger;
    constructor(generalData_Service: GeneralData_CONCRETERT_Service, calc_ConcreteRt_Service: Calc_ConcreteRt_Service, rt_Repository: ConcreteRtRepository);
    verifyInitRt(body: ConcreteRtInitDto): Promise<{
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
    calculateRt(body: Calc_Concrete_RT_Dto): Promise<{
        success: boolean;
        result: any;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_Concrete_RT_Dto & Calc_Concrete_RT_Out): Promise<{
        success: boolean;
        data: import("../schemas").RT;
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
