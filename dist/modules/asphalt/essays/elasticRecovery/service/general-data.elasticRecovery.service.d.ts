import { ElasticRecoveryRepository } from "../repository";
import { ElasticRecoveryInitDto } from "../dto/elasticRecovery-init.dto";
import { MaterialsRepository } from '../../../materials/repository';
export declare class GeneralData_ElasticRecovery_Service {
    private readonly elasticRecoveryRepository;
    private readonly materialRepository;
    private logger;
    constructor(elasticRecoveryRepository: ElasticRecoveryRepository, materialRepository: MaterialsRepository);
    verifyInitElasticRecovery({ name, material }: ElasticRecoveryInitDto): Promise<boolean>;
}
