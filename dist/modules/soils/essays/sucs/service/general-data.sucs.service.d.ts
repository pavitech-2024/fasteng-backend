import { SucsRepository } from '../repository';
import { SucsInitDto } from '../dto/sucs-init.dto';
import { SamplesRepository } from '../../../samples/repository';
import { GranulometryRepository } from '../../granulometry/repository/index';
export declare class GeneralData_SUCS_Service {
    private readonly sucsRepository;
    private readonly granulometryRepository;
    private readonly sampleRepository;
    private logger;
    constructor(sucsRepository: SucsRepository, granulometryRepository: GranulometryRepository, sampleRepository: SamplesRepository);
    verifyInitSucs({ name, sample }: SucsInitDto): Promise<boolean>;
}
