import { Response } from 'express';
import { ElasticRecoveryService } from "../service";
import { Calc_ElasticRecovery_Dto, Calc_ElasticRecovery_Out } from "../dto/calc-elasticRecovery.dto";
import { ElasticRecoveryInitDto } from "../dto/elasticRecovery-init.dto";
export declare class ElasticRecoveryController {
    private readonly elasticRecoveryService;
    private logger;
    constructor(elasticRecoveryService: ElasticRecoveryService);
    verifyInitelasticRecovery(response: Response, body: ElasticRecoveryInitDto): Promise<Response<any, Record<string, any>>>;
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
    saveEssay(response: Response, body: Calc_ElasticRecovery_Dto & Calc_ElasticRecovery_Out): Promise<Response<any, Record<string, any>>>;
}
