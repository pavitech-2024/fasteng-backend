import { GeneralData_CBR_Service } from './general-data.cbr.service';
import { CbrInitDto } from '../dto/cbr-init.dto';
import { Calc_CBR_Dto, Calc_CBR_Out } from '../dto/calc.cbr.dto';
import { Calc_CBR_Service } from './calc.cbr.service';
import { CbrRepository } from '../repository';
export declare class CbrService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly Cbr_Repository;
    constructor(generalData_Service: GeneralData_CBR_Service, calc_Service: Calc_CBR_Service, Cbr_Repository: CbrRepository);
    verifyInitCbr(body: CbrInitDto): Promise<{
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
    calculateCbr(body: Calc_CBR_Dto): Promise<{
        success: boolean;
        result: Calc_CBR_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_CBR_Dto & Calc_CBR_Out): Promise<{
        success: boolean;
        data: import("../schemas").Cbr;
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
