import { MaterialsRepository } from '../../../materials/repository';
import { Calc_AsphaltGranulometry_Dto, Calc_AsphaltGranulometry_Out } from '../dto/asphalt.calc.granulometry.dto';
import { AsphaltGranulometryRepository } from '../repository';
type limit = {
    value: number;
    index: number;
};
export declare class Calc_AsphaltGranulometry_Service {
    private readonly granulometryRepository;
    private readonly materialsRepository;
    private logger;
    constructor(granulometryRepository: AsphaltGranulometryRepository, materialsRepository: MaterialsRepository);
    calculateGranulometry({ step2Data, isSuperpave, }: Calc_AsphaltGranulometry_Dto): Promise<{
        success: boolean;
        result: Calc_AsphaltGranulometry_Out;
    }>;
    getDiameter: (table_data: {
        sieve_label: string;
        passant: number;
        retained: number;
    }[], percentage: number, limits: {
        upperLimit: limit;
        inferiorLimit: limit;
    }) => number;
    getPercentage: (percentage: number, table_data: {
        sieve_label: string;
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
