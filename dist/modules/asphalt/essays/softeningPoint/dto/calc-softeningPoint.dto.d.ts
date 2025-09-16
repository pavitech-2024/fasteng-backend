import { SofteningPoint } from "../schemas";
export declare class Calc_SofteningPoint_Dto {
    generalData: SofteningPoint['generalData'];
    softeningPoint: SofteningPoint['softeningPoint'];
}
export interface Calc_SofteningPoint_Out {
    softeningPoint: number;
    indexOfSusceptibility: number;
    alerts: string[];
}
