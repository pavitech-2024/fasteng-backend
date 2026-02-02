import { Calc_Adhesiveness_Dto, Calc_Adhesiveness_Out } from "../dto/calc.adhesiveness.dto";
export declare class Calc_Adhesiveness_Service {
    private logger;
    calculateAdhesiveness({ adhesiveness }: Calc_Adhesiveness_Dto): Promise<{
        success: boolean;
        result: Calc_Adhesiveness_Out;
    }>;
}
