import { SandIncreaseRepository } from "../repository";
import { MaterialsRepository } from "../../../../../modules/concrete/materials/repository";
import { SandIncreaseInitDto } from "../dto/sand-increase-init.dto";
export declare class GeneralData_SandIncrease_Service {
    private readonly sandIncreaseRepository;
    private readonly materialsRepository;
    private logger;
    constructor(sandIncreaseRepository: SandIncreaseRepository, materialsRepository: MaterialsRepository);
    verifyInitSandIncrease({ name, material }: SandIncreaseInitDto): Promise<boolean>;
}
