import { Calc_SandEquivalent_Dto, Calc_SandEquivalent_Out } from "../dto/calc-sandEquivalent.dto";
export declare class Calc_SandEquivalent_Service {
    private logger;
    calculateSandEquivalent({ sandEquivalent, generalData }: Calc_SandEquivalent_Dto): Promise<{
        success: boolean;
        result: Calc_SandEquivalent_Out;
    }>;
}
