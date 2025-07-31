import { Calc_SayboltFurol_Dto, Calc_SayboltFurol_Out } from "../dto/calc-sayboltFurol.dto";
export declare class Calc_SayboltFurol_Service {
    private logger;
    calculateSayboltFurol({ sayboltFurol, generalData }: Calc_SayboltFurol_Dto): Promise<{
        success: boolean;
        result: Calc_SayboltFurol_Out;
    }>;
    private calculateEquation;
    private sumXY;
    private sumX;
    private sumY;
    private sumPow2X;
    private Pow2SumX;
    private calculateViscosity;
    private calculateTemperature;
    private insertValuesInRanges;
    private insertBandsOfCurve;
}
