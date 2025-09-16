import { Calc_Igg_Dto, Calc_Igg_Out } from '../dto/calc-igg.dto';
import { Calc_Igg_Service } from './calc.igg.service';
import { GeneralData_Igg_Service } from './general-data.igg.service';
import { IggInitDto } from '../dto/init-igg.dto';
import { IggRepository } from '../repository';
export declare class IggService {
    private readonly generalData_Service;
    private readonly igg_Repository;
    private readonly calc_Service;
    constructor(generalData_Service: GeneralData_Igg_Service, igg_Repository: IggRepository, calc_Service: Calc_Igg_Service);
    verifyInitIgg(body: IggInitDto): Promise<{
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
    calculateIgg(body: Calc_Igg_Dto): Promise<{
        success: boolean;
        result: Calc_Igg_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_Igg_Dto & Calc_Igg_Out): Promise<{
        success: boolean;
        data: import("../schemas").Igg;
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
    deleteEssay(id: string): Promise<{
        success: boolean;
        data: import("../schemas").Igg;
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
