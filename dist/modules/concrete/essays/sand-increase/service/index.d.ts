import { GeneralData_SandIncrease_Service } from './general-data.sand-increase.service';
import { Calc_SandIncrease_Service } from './calc.sand-increase.service';
import { SandIncreaseRepository } from '../repository';
import { SandIncreaseInitDto } from '../dto/sand-increase-init.dto';
import { Calc_MoistureContentDto, Calc_SandIncrease_Dto, Calc_UnitMassDto, Save_SandIncreaseDto } from '../dto/calc.sand-increase.dto';
import { Calc_UnitMass_Service } from './calc.unitMass.service';
import { Calc_MoistureContent_Service } from './calc.moistureContents.service';
export declare class SandIncreaseService {
    private readonly generalData_Service;
    private readonly calc_UnitMass_Service;
    private readonly calc_MoistureContent_Service;
    private readonly calc_Service;
    private readonly sandIncreaseRepository;
    private logger;
    constructor(generalData_Service: GeneralData_SandIncrease_Service, calc_UnitMass_Service: Calc_UnitMass_Service, calc_MoistureContent_Service: Calc_MoistureContent_Service, calc_Service: Calc_SandIncrease_Service, sandIncreaseRepository: SandIncreaseRepository);
    verifyInitSandIncrease(body: SandIncreaseInitDto): Promise<{
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
    calculateUnitMass(body: Calc_UnitMassDto): Promise<{
        success: boolean;
        result: number[];
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateMoistureContent(body: Calc_MoistureContentDto): Promise<{
        success: boolean;
        result: number[];
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateSandIncrease(body: Calc_SandIncrease_Dto): Promise<{
        success: boolean;
        result: import("../dto/calc.sand-increase.dto").Calc_SandIncrease_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Save_SandIncreaseDto): Promise<{
        success: boolean;
        data: import("../schema").SandIncrease;
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
