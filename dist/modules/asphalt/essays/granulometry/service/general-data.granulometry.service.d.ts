import { MaterialsRepository } from '../../../materials/repository';
import { AsphaltGranulometryRepository } from "../repository";
import { AsphaltGranulometryInitDto } from "../dto/asphalt.granulometry-init.dto";
export declare class GeneralData_AsphaltGranulometry_Service {
    private readonly granulometryRepository;
    private readonly materialRepository;
    private logger;
    constructor(granulometryRepository: AsphaltGranulometryRepository, materialRepository: MaterialsRepository);
    verifyInitGranulometry({ name, material }: AsphaltGranulometryInitDto): Promise<boolean>;
}
