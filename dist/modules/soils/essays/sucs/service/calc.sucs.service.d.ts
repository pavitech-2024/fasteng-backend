import { Calc_SUCS_Dto, Calc_SUCS_Out } from '../dto/calc.sucs.dto';
import { SucsRepository } from '../repository';
import { SamplesRepository } from '../../../../../modules/soils/samples/repository';
type limit = {
    value: number;
    index: number;
};
export declare class Calc_SUCS_Service {
    private readonly sucsRepository;
    private readonly sampleRepository;
    private logger;
    constructor(sucsRepository: SucsRepository, sampleRepository: SamplesRepository);
    calculateSucs({ step2Data }: Calc_SUCS_Dto): Promise<{
        success: boolean;
        result: Calc_SUCS_Out;
    }>;
    getDiameter: (list_sieves: {
        sieve: string;
        passant: number;
    }[], percentage: number, limits: {
        upperLimit: limit;
        inferiorLimit: limit;
    }) => number;
    getPercentage: (percentage: number, list_sieves: {
        sieve: string;
        passant: number;
    }[]) => {
        upperLimit: {
            value: number;
            index: number;
        };
        inferiorLimit: {
            value: number;
            index: number;
        };
    };
}
export {};
