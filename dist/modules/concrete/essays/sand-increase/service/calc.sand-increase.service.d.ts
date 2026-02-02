import { Calc_SandIncrease_Dto, Calc_SandIncrease_Out } from "../dto/calc.sand-increase.dto";
export declare class Calc_SandIncrease_Service {
    private logger;
    constructor();
    calculateSandIncrease(calc_SandIncreaseDto: Calc_SandIncrease_Dto): Promise<{
        success: boolean;
        result: Calc_SandIncrease_Out;
    }>;
}
