import { GeneralData_SPECIFYMASS_Service } from './general-data.specifyMass.service';
import { SpecifyMassInitDto } from '../dto/specifyMass-init.dto';
import { Calc_SPECIFYMASS_Dto, Calc_SPECIFYMASS_Out } from '../dto/calc.specifyMass.dto';
import { SpecifyMassRepository } from '../repository';
import { Calc_SPECIFYMASS_Service } from './calc.specifyMass.service';
export declare class SpecifyMassService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly SpecifyMass_Repository;
    private logger;
    constructor(generalData_Service: GeneralData_SPECIFYMASS_Service, calc_Service: Calc_SPECIFYMASS_Service, SpecifyMass_Repository: SpecifyMassRepository);
    verifyInitSpecifyMass(body: SpecifyMassInitDto): Promise<{
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
    calculateSpecifyMass(body: Calc_SPECIFYMASS_Dto): Promise<{
        success: boolean;
        result: Calc_SPECIFYMASS_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_SPECIFYMASS_Dto & Calc_SPECIFYMASS_Out): Promise<{
        success: boolean;
        data: import("../schemas").SpecifyMass;
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
