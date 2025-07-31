import { DuctilityRepository } from '../repository';
import { DuctilityInitDto } from '../dto/ductility-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
export declare class GeneralData_DUCTILITY_Service {
    private readonly ductilityRepository;
    private readonly materialRepository;
    private logger;
    constructor(ductilityRepository: DuctilityRepository, materialRepository: MaterialsRepository);
    verifyInitDuctility({ name, material }: DuctilityInitDto): Promise<boolean>;
}
