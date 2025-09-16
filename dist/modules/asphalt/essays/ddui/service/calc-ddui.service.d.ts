import { Calc_Ddui_Dto, Calc_Ddui_Out } from "../dto/calc-ddui.dto";
export declare class Calc_Ddui_Service {
    private logger;
    private confirmResults;
    calculateDdui({ dduiStep2, dduiStep3, generalData }: Calc_Ddui_Dto): Promise<{
        success: boolean;
        result: Calc_Ddui_Out;
    }>;
    private calculateRtsValues;
}
