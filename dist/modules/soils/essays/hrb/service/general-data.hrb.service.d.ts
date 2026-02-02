import { SamplesRepository } from '../../../samples/repository';
import { HrbRepository } from '../repository';
import { HrbInitDto } from '../dto/hrb-init.dto';
export declare class GeneralData_HRB_Service {
    private readonly hrbRepository;
    private readonly sampleRepository;
    private logger;
    constructor(hrbRepository: HrbRepository, sampleRepository: SamplesRepository);
    verifyInitHrb({ name, sample }: HrbInitDto): Promise<boolean>;
}
