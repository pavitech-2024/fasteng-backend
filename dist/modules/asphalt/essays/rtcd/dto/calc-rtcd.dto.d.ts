import { Rtcd } from '../schemas';
export declare class Calc_Rtcd_Dto {
    generalData: Rtcd['generalData'];
    rtcdStep2: Rtcd['rtcdStep2'];
    rtcdStep3: Rtcd['rtcdStep3'];
}
export interface Calc_Rtcd_Out {
    everyRtsMpa: number[];
    everyRtsKgf: number[];
    average: number;
}
