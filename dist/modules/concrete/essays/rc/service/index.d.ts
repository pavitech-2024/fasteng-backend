import { Calc_CONCRETERC_Dto, Calc_CONCRETERC_Out } from "../dto/calc.rc.dto";
import { ConcreteRcInitDto } from "../dto/concretert-init.dto";
import { ConcreteRCRepository } from "../respository";
import { Calc_CONCRETERC_Service } from "./calc.rc.service";
import { GeneralData_CONCRETERC_Service } from "./general-data.rc.service";
export declare class ConcreteRcService {
    private readonly generalData_Service;
    private readonly calc_concreteRc_Service;
    private readonly Rc_Repository;
    private logger;
    constructor(generalData_Service: GeneralData_CONCRETERC_Service, calc_concreteRc_Service: Calc_CONCRETERC_Service, Rc_Repository: ConcreteRCRepository);
    verifyInitRc(body: ConcreteRcInitDto): Promise<{
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
    calculateRc(body: Calc_CONCRETERC_Dto): Promise<{
        success: boolean;
        result: Calc_CONCRETERC_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_CONCRETERC_Dto & Calc_CONCRETERC_Out): Promise<{
        success: boolean;
        data: import("../schemas").RC;
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
