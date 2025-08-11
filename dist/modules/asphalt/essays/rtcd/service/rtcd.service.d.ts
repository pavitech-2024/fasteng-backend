import { Calc_Rtcd_Dto, Calc_Rtcd_Out } from '../dto/calc-rtcd.dto';
import { RtcdInitDto } from '../dto/init-rtcd.dto';
import { RtcdRepository } from '../repository';
import { GeneralData_Rtcd_Service } from './general-data.rtcd.service';
import { Calc_Rtcd_Service } from './calc.rtcd.service';
export declare class RtcdService {
    private readonly generalData_Service;
    private readonly rtcd_Repository;
    private readonly calc_Service;
    constructor(generalData_Service: GeneralData_Rtcd_Service, rtcd_Repository: RtcdRepository, calc_Service: Calc_Rtcd_Service);
    verifyInitRtcd(body: RtcdInitDto): Promise<{
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
    calculateRtcd(body: Calc_Rtcd_Dto): Promise<{
        success: boolean;
        result: Calc_Rtcd_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_Rtcd_Dto & Calc_Rtcd_Out): Promise<{
        success: boolean;
        data: import("../schemas").Rtcd;
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
        data: import("../schemas").Rtcd;
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
