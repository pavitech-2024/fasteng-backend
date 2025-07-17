import { ChapmanInitDto } from '../dto/chapman-init.dto';
import { GeneralData_Chapman_Service } from './general-data.chapman.service';
import { ChapmanRepository } from '../repository';
import { Calc_CHAPMAN_Service } from './calc.chapman.service';
import { Calc_CHAPMAN_Out, Calc_CHAPMAN_dto } from '../dto/calc.chapman.dto';
export declare class ChapmanService {
    private readonly generalData_Service;
    private readonly chapman_Repository;
    private readonly calc_Service;
    constructor(generalData_Service: GeneralData_Chapman_Service, chapman_Repository: ChapmanRepository, calc_Service: Calc_CHAPMAN_Service);
    verifyInitChapman(body: ChapmanInitDto): Promise<{
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
    calculateChapman(body: Calc_CHAPMAN_dto): Promise<{
        success: boolean;
        result: {
            m_e: number;
        };
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_CHAPMAN_dto & Calc_CHAPMAN_Out): Promise<{
        success: boolean;
        data: import("../schemas").Chapman;
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
