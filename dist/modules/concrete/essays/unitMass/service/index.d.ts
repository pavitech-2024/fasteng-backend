import { GeneralData_UnitMass_Service } from './general-data.unitMass.service';
import { UnitMass_Init_Dto } from '../dto/unitMass-init.dto';
import { UnitMass_Step2_Dto } from '../dto/unitMass-step2.dto';
import { step2Data_Service } from './step2Data.unitMass.service';
import { Result_UnitMass_Service } from './result.unitMass.service';
import { Result_UnitMass_Dto, UnitMass_Result } from '../dto/unitMass-result.dto';
import { UnitMassRepository } from '../repository';
export declare class UnitMassService {
    private readonly generalData_Service;
    private readonly step2_UnitMass_Service;
    private readonly result_UnitMass_Service;
    private readonly unitMassRepository;
    constructor(generalData_Service: GeneralData_UnitMass_Service, step2_UnitMass_Service: step2Data_Service, result_UnitMass_Service: Result_UnitMass_Service, unitMassRepository: UnitMassRepository);
    verifyInitUnitMass(body: UnitMass_Init_Dto): Promise<{
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
    verifyStep2DataUnitMass(body: UnitMass_Step2_Dto): Promise<{
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
    resultUnitMass(body: Result_UnitMass_Dto): Promise<{
        success: boolean;
        result: {
            result: number;
        };
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Result_UnitMass_Dto & UnitMass_Result): Promise<{
        success: boolean;
        data: import("../schemas").UnitMass;
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
