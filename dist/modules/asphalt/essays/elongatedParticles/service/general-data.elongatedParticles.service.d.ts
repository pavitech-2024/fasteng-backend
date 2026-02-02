import { ElongatedParticlesRepository } from '../repository';
import { ElongatedParticlesInitDto } from '../dto/elongatedParticles-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
export declare class GeneralData_ELONGATEDPARTICLES_Service {
    private readonly elongatedParticlesRepository;
    private readonly materialRepository;
    private logger;
    constructor(elongatedParticlesRepository: ElongatedParticlesRepository, materialRepository: MaterialsRepository);
    verifyInitElongatedParticles({ name, material }: ElongatedParticlesInitDto): Promise<boolean>;
}
