import { CbrRepository } from '../repository';
import { SamplesRepository } from '../../../samples/repository';
import { Calc_CBR_Dto, Calc_CBR_Out } from '../dto/calc.cbr.dto';
export declare class Calc_CBR_Service {
    private readonly cbrRepository;
    private readonly sampleRepository;
    private logger;
    constructor(cbrRepository: CbrRepository, sampleRepository: SamplesRepository);
    calculateCbr({ step2Data, expansionData }: Calc_CBR_Dto): Promise<{
        success: boolean;
        result: Calc_CBR_Out;
    }>;
}
