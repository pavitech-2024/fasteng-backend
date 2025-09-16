import { MaterialsRepository } from '../../../materials/repository';
import { ElasticRecoveryRepository } from "../repository";
import { Calc_ElasticRecovery_Dto, Calc_ElasticRecovery_Out } from "../dto/calc-elasticRecovery.dto";
export declare class Calc_ElasticRecovery_Service {
    private readonly elasticRecoveryRepository;
    private readonly materialRepository;
    private logger;
    constructor(elasticRecoveryRepository: ElasticRecoveryRepository, materialRepository: MaterialsRepository);
    calculateElasticRecovery(calcElasticRecoveryDto: Calc_ElasticRecovery_Dto): Promise<{
        success: boolean;
        result: Calc_ElasticRecovery_Out;
    }>;
    private calculate;
}
