import { Calc_MoistureContentDto } from "../dto/calc.sand-increase.dto";
export declare class Calc_MoistureContent_Service {
    private logger;
    constructor();
    calculateMoistureContent(body: Calc_MoistureContentDto): Promise<{
        success: boolean;
        result: number[];
    }>;
}
