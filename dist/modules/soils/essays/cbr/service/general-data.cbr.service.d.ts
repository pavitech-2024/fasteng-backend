import { CbrRepository } from '../repository';
import { CbrInitDto } from '../dto/cbr-init.dto';
import { SamplesRepository } from '../../../samples/repository';
export declare class GeneralData_CBR_Service {
    private readonly cbrRepository;
    private readonly sampleRepository;
    private logger;
    constructor(cbrRepository: CbrRepository, sampleRepository: SamplesRepository);
    verifyInitCbr({ name, sample }: CbrInitDto): Promise<boolean>;
}
