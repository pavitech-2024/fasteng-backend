import { RC } from '../schemas';
export declare class Calc_CONCRETERC_Dto {
    generalData: RC['generalData'];
    step2Data: RC['step2Data'];
    step3Data: RC['step3Data'];
}
export interface Calc_CONCRETERC_Out {
    tolerances: number[];
    correctionFactors: number[];
    finalResult: number[];
}
