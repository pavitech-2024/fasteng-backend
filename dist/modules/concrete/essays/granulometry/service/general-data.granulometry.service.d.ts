import { ConcreteGranulometryRepository } from '../repository';
import { ConcreteGranulometryInitDto } from '../dto/concretegranulometry-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
export declare class GeneralData_CONCRETEGRANULOMETRY_Service {
    private readonly granulometryRepository;
    private readonly materialRepository;
    private logger;
    constructor(granulometryRepository: ConcreteGranulometryRepository, materialRepository: MaterialsRepository);
    verifyInitGranulometry({ name, material }: ConcreteGranulometryInitDto): Promise<boolean>;
}
