import { CompressionRepository } from '../repository';
import { SamplesRepository } from '../../../../../modules/soils/samples/repository';
import { Calc_Compression_Dto, Calc_Compression_Out } from '../dto/calc.compression.dto';
export declare class Calc_Compression_Service {
    private readonly compressionRepository;
    private readonly sampleRepository;
    private logger;
    constructor(compressionRepository: CompressionRepository, sampleRepository: SamplesRepository);
    calculateCompression({ hygroscopicData, humidityDeterminationData, }: Calc_Compression_Dto): Promise<{
        success: boolean;
        result: Calc_Compression_Out;
    }>;
    private bisection;
    private findAB;
}
