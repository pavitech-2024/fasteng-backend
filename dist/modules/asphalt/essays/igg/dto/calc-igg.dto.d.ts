import { Igg } from '../schemas';
export declare class Calc_Igg_Dto {
    generalData: Igg['generalData'];
    iggStep2: Igg['iggStep2'];
    iggStep3: Igg['iggStep3'];
    iggStep4: Igg['iggStep4'];
}
export interface Calc_Igg_Out {
    iggs: number[];
    igis: number[];
    arrowsAverage: number[];
    variancesAverage: number[];
    conditions: string[];
}
