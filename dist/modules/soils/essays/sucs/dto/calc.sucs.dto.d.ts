import { Sucs } from '../schemas';
export declare class Calc_SUCS_Dto {
    generalData: Sucs['generalData'];
    step2Data: Sucs['step2Data'];
}
export interface Calc_SUCS_Out {
    cc: number;
    cnu: number;
    ip: number;
    classification: string;
}
