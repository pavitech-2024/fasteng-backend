import { AngularityRepository } from '../repository';
import { AngularityInitDto } from '../dto/angularity-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
export declare class GeneralData_ANGULARITY_Service {
    private readonly angularityRepository;
    private readonly materialRepository;
    private logger;
    constructor(angularityRepository: AngularityRepository, materialRepository: MaterialsRepository);
    verifyInitAngularity({ name, material }: AngularityInitDto): Promise<boolean>;
}
