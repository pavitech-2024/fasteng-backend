import { Fwd } from '../schema';
export declare class Calc_Fwd_Dto {
    generalData: Fwd['generalData'];
    fwdStep2: Fwd['fwdStep2'];
    fwdStep3: Fwd['fwdStep3'];
}
export interface Calc_Fwd_Out {
    processedData: any[];
    graphData: number[][];
    deletedPositions: number[];
}
