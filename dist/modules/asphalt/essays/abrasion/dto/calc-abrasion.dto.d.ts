import { Abrasion } from "../schemas";
export declare class Calc_Abrasion_Dto {
    generalData: Abrasion['generalData'];
    abrasionCalc: Abrasion['abrasionCalc'];
}
export interface Calc_Abrasion_Out {
    losAngelesAbrasion: number;
    alerts: string[];
}
