import { Calc_ViscosityRotational_Out } from '../dto/calc-viscosityRotational.dto';
export declare class Calc_ViscosityRotational_Service {
    private logger;
    calculateViscosityRotational(body: any): Promise<{
        success: boolean;
        result: Calc_ViscosityRotational_Out;
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
