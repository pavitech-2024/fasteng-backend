import { GeneralData_CONCRETEGRANULOMETRY_Service } from './general-data.granulometry.service';
import { ConcreteGranulometryInitDto } from '../dto/concretegranulometry-init.dto';
import { Calc_CONCRETEGRANULOMETRY_Dto, Calc_CONCRETEGRANULOMETRY_Out } from '../dto/calc.granulometry.dto';
import { ConcreteGranulometryRepository } from '../repository';
import { Calc_CONCRETEGRANULOMETRY_Service } from './calc.granulometry.service';
export declare class ConcreteGranulometryService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly Granulometry_Repository;
    private logger;
    constructor(generalData_Service: GeneralData_CONCRETEGRANULOMETRY_Service, calc_Service: Calc_CONCRETEGRANULOMETRY_Service, Granulometry_Repository: ConcreteGranulometryRepository);
    verifyInitGranulometry(body: ConcreteGranulometryInitDto): Promise<{
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
    calculateGranulometry(body: Calc_CONCRETEGRANULOMETRY_Dto): Promise<{
        success: boolean;
        result: Calc_CONCRETEGRANULOMETRY_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_CONCRETEGRANULOMETRY_Dto & Calc_CONCRETEGRANULOMETRY_Out): Promise<{
        success: boolean;
        data: import("../schemas").Granulometry;
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
