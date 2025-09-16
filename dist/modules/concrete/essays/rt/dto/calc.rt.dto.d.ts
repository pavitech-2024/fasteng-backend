import { RT } from '../schemas';
export declare class Calc_Concrete_RT_Dto {
    generalData: RT['generalData'];
    step2Data: RT['step2Data'][];
    step3Data: RT['step3Data'];
    step4Data: RT['step4Data'];
}
export interface Calc_Concrete_RT_Out {
    flexualTensileStrength: number;
    compressionResistance: number;
}
