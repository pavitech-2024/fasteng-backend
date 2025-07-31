import { ElasticRecoveryRepository } from "../repository";
import { ElasticRecoveryInitDto } from "../dto/elasticRecovery-init.dto";
import { Calc_ElasticRecovery_Dto, Calc_ElasticRecovery_Out } from "../dto/calc-elasticRecovery.dto";
import { Calc_ElasticRecovery_Service } from "./calc.elasticRecovery.service";
import { GeneralData_ElasticRecovery_Service } from "./general-data.elasticRecovery.service";
export declare class ElasticRecoveryService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly ElasticRecovery_Repository;
    private logger;
    constructor(generalData_Service: GeneralData_ElasticRecovery_Service, calc_Service: Calc_ElasticRecovery_Service, ElasticRecovery_Repository: ElasticRecoveryRepository);
    verifyInitElasticRecovery(body: ElasticRecoveryInitDto): Promise<{
        success: boolean;
        result?: undefined;
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
        success?: undefined;
    }>;
    calculateElasticRecovery(body: Calc_ElasticRecovery_Dto): Promise<{
        success: boolean;
        result: Calc_ElasticRecovery_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_ElasticRecovery_Dto & Calc_ElasticRecovery_Out): Promise<{
        success: boolean;
        data: import("../schema").ElasticRecovery;
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
