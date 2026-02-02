import { SandEquivalent } from "../schemas";
export declare class Calc_SandEquivalent_Dto {
    generalData: SandEquivalent['generalData'];
    sandEquivalent: SandEquivalent['sandEquivalent'];
}
export interface Calc_SandEquivalent_Out {
    sandEquivalent: number;
    alerts: string[];
}
