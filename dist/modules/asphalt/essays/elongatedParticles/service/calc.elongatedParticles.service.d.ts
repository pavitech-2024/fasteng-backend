import { Calc_ELONGATEDPARTICLES_Dto, Calc_ELONGATEDPARTICLES_Out } from '../dto/calc.elongatedParticles.dto';
import { ElongatedParticlesRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
export declare class Calc_ELONGATEDPARTICLES_Service {
    private readonly elongatedParticlesRepository;
    private readonly materialRepository;
    private logger;
    constructor(elongatedParticlesRepository: ElongatedParticlesRepository, materialRepository: MaterialsRepository);
    calculateElongatedParticles({ step2Data }: Calc_ELONGATEDPARTICLES_Dto): Promise<{
        success: boolean;
        result: Calc_ELONGATEDPARTICLES_Out;
    }>;
}
