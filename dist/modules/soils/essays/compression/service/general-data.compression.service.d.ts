import { CompressionRepository } from '../repository';
import { SamplesRepository } from '../../../../../modules/soils/samples/repository';
import { CompressionInitDto } from '../dto/compression-init.dto';
export declare class GeneralData_Compression_Service {
    private readonly compressionRepository;
    private readonly sampleRepository;
    private logger;
    constructor(compressionRepository: CompressionRepository, sampleRepository: SamplesRepository);
    verifyInitCompression({ name, sample }: CompressionInitDto): Promise<boolean>;
}
