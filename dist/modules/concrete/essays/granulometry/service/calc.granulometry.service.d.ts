import { Calc_CONCRETEGRANULOMETRY_Dto, Calc_CONCRETEGRANULOMETRY_Out } from '../dto/calc.granulometry.dto';
import { ConcreteGranulometryRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/concrete/materials/repository';
type limit = {
    value: number;
    index: number;
};
export declare class Calc_CONCRETEGRANULOMETRY_Service {
    private readonly granulometryRepository;
    private readonly materialsRepository;
    private logger;
    constructor(granulometryRepository: ConcreteGranulometryRepository, materialsRepository: MaterialsRepository);
    calculateGranulometry({ step2Data, }: Calc_CONCRETEGRANULOMETRY_Dto): Promise<{
        success: boolean;
        result: Calc_CONCRETEGRANULOMETRY_Out;
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
