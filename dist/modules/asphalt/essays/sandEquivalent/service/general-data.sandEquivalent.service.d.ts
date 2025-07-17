import { MaterialsRepository } from '../../../materials/repository';
import { SandEquivalentInitDto } from "../dto/init-sandEquivalent.dto";
import { SandEquivalentRepository } from "../repository";
export declare class GeneralData_SandEquivalent_Service {
    private readonly sandEquivalentRepository;
    private readonly materialsRepository;
    private logger;
    constructor(sandEquivalentRepository: SandEquivalentRepository, materialsRepository: MaterialsRepository);
    verifyInitSandEquivalent({ name, material }: SandEquivalentInitDto): Promise<boolean>;
}
