import { Angularity } from '../schemas';
export declare class Calc_ANGULARITY_Dto {
    generalData: Angularity['generalData'];
    step2Data: Angularity['step2Data'];
}
export interface Calc_ANGULARITY_Out {
    angularities: {
        label: string;
        angularity: number;
    }[];
    averageOfAll: number;
    porcentagesOfVoids: number[];
    alerts: string[];
}
