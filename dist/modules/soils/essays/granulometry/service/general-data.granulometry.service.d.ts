import { GranulometryRepository } from '../repository';
import { GranulometryInitDto } from '../dto/granulometry-init.dto';
import { SamplesRepository } from '../../../samples/repository';
export declare class GeneralData_GRANULOMETRY_Service {
    private readonly granulometryRepository;
    private readonly sampleRepository;
    private logger;
    constructor(granulometryRepository: GranulometryRepository, sampleRepository: SamplesRepository);
    verifyInitGranulometry({ name, sample }: GranulometryInitDto): Promise<boolean>;
}
