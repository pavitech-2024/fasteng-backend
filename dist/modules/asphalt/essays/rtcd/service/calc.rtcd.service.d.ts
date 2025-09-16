import { Calc_Rtcd_Dto, Calc_Rtcd_Out } from '../dto/calc-rtcd.dto';
export declare class Calc_Rtcd_Service {
    private logger;
    private confirmResults;
    calculateRtcd({ rtcdStep2, rtcdStep3 }: Calc_Rtcd_Dto): Promise<{
        success: boolean;
        result: Calc_Rtcd_Out;
    }>;
    private calculateRtsValues;
}
