import { AngularityInitDto } from '../dto/angularity-init.dto';
import { Calc_ANGULARITY_Dto, Calc_ANGULARITY_Out } from '../dto/calc.angularity.dto';
import { AngularityRepository } from '../repository';
import { Calc_ANGULARITY_Service } from './calc.angularity.service';
import { GeneralData_ANGULARITY_Service } from './general-data.angularity.service';
export declare class AngularityService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly Angularity_Repository;
    private logger;
    constructor(generalData_Service: GeneralData_ANGULARITY_Service, calc_Service: Calc_ANGULARITY_Service, Angularity_Repository: AngularityRepository);
    verifyInitAngularity(body: AngularityInitDto): Promise<{
        result: boolean;
        error?: undefined;
    } | {
        result: {
            success: boolean;
        };
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateAngularity(body: Calc_ANGULARITY_Dto): Promise<{
        success: boolean;
        result: Calc_ANGULARITY_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_ANGULARITY_Dto & Calc_ANGULARITY_Out): Promise<{
        success: boolean;
        data: import("../schemas").Angularity;
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
