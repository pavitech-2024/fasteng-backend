import { Calc_Rtfo_Dto, Calc_Rtfo_Out } from "../dto/calc-rtfo.dto";
export declare class Calc_Rtfo_Service {
    private logger;
    calculateRtfo({ rtfo, generalData }: Calc_Rtfo_Dto): Promise<{
        success: boolean;
        result: Calc_Rtfo_Out;
    }>;
}
