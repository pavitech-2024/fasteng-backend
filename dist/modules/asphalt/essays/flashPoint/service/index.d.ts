import { FlashPointInitDto } from '../dto/flashPoint-init.dto';
import { Calc_FLASHPOINT_Dto, Calc_FLASHPOINT_Out } from '../dto/calc.flashPoint.dto';
import { FlashPointRepository } from '../repository';
import { Calc_FLASHPOINT_Service } from './calc.flashPoint.service';
import { GeneralData_FLASHPOINT_Service } from './general-data.flashPoint.service';
export declare class FlashPointService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly FlashPoint_Repository;
    private logger;
    constructor(generalData_Service: GeneralData_FLASHPOINT_Service, calc_Service: Calc_FLASHPOINT_Service, FlashPoint_Repository: FlashPointRepository);
    verifyInitFlashPoint(body: FlashPointInitDto): Promise<{
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
    calculateFlashPoint(body: Calc_FLASHPOINT_Dto): Promise<{
        success: boolean;
        result: Calc_FLASHPOINT_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_FLASHPOINT_Dto & Calc_FLASHPOINT_Out): Promise<{
        success: boolean;
        data: import("../schemas").FlashPoint;
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
