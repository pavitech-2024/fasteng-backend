import { SpecifyMassRepository } from '../repository';
import { SpecifyMassInitDto } from '../dto/specifyMass-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
export declare class GeneralData_SPECIFYMASS_Service {
    private readonly specifyMassRepository;
    private readonly materialRepository;
    private logger;
    constructor(specifyMassRepository: SpecifyMassRepository, materialRepository: MaterialsRepository);
    verifyInitSpecifyMass({ name, material }: SpecifyMassInitDto): Promise<boolean>;
}
