import { Calc_HRB_Dto, Calc_HRB_Out } from '../dto/calc.hrb.dto';
export declare class Calc_HRB_Service {
    private logger;
    calculateHrb: ({ step2Data }: Calc_HRB_Dto) => Promise<{
        success: boolean;
        result: Calc_HRB_Out;
    }>;
    calculate_group_index: ({ liquidity_limit, sieve200, plasticity_index }: {
        liquidity_limit: any;
        sieve200: any;
        plasticity_index: any;
    }) => number;
}
