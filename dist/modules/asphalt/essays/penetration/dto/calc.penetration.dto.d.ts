import { Penetration } from "../schemas";
export declare class Calc_Penetration_Dto {
    generalData: Penetration['generalData'];
    penetrationCalc: Penetration['penetrationCalc'];
}
export interface Calc_Penetration_Out {
    penetration: number;
    cap: string;
    alerts: string;
    indexOfSusceptibility: number;
}
