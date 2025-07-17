import { Hrb } from '../schemas';
export declare class Calc_HRB_Dto {
    generalData: Hrb['generalData'];
    step2Data: Hrb['step2Data'];
}
export interface Calc_HRB_Out {
    plasticity_index: number;
    classification: string;
    group_index: number;
}
