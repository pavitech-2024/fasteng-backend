import { GeneralData_GRANULOMETRY_Service } from './general-data.granulometry.service';
import { GranulometryInitDto } from '../dto/granulometry-init.dto';
import { Calc_GRANULOMETRY_Dto, Calc_GRANULOMETRY_Out } from '../dto/calc.granulometry.dto';
import { GranulometryRepository } from '../repository';
import { Calc_GRANULOMETRY_Service } from './calc.granulometry.service';
export declare class GranulometryService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly Granulometry_Repository;
    private logger;
    constructor(generalData_Service: GeneralData_GRANULOMETRY_Service, calc_Service: Calc_GRANULOMETRY_Service, Granulometry_Repository: GranulometryRepository);
    verifyInitGranulometry(body: GranulometryInitDto): Promise<{
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
    calculateGranulometry(body: Calc_GRANULOMETRY_Dto): Promise<{
        success: boolean;
        result: Calc_GRANULOMETRY_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_GRANULOMETRY_Dto & Calc_GRANULOMETRY_Out): Promise<{
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
    getGranulometryBySampleId(sample_id: string): Promise<import("../schemas").Granulometry | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
}
