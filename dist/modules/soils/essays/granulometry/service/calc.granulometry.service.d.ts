import { Calc_GRANULOMETRY_Dto, Calc_GRANULOMETRY_Out } from '../dto/calc.granulometry.dto';
import { GranulometryRepository } from '../repository';
import { SamplesRepository } from '../../../../../modules/soils/samples/repository';
type limit = {
    value: number;
    index: number;
};
export declare class Calc_GRANULOMETRY_Service {
    private readonly granulometryRepository;
    private readonly sampleRepository;
    private logger;
    constructor(granulometryRepository: GranulometryRepository, sampleRepository: SamplesRepository);
    calculateGranulometry({ step2Data, }: Calc_GRANULOMETRY_Dto): Promise<{
        success: boolean;
        result: Calc_GRANULOMETRY_Out;
    }>;
    getDiameter: (table_data: {
        sieve: string;
        passant: number;
        retained: number;
    }[], percentage: number, limits: {
        upperLimit: limit;
        inferiorLimit: limit;
    }) => number;
    getPercentage: (percentage: number, table_data: {
        sieve: string;
        passant: number;
        retained: number;
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
