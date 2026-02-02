import { SpecifyMass } from '../schemas';
export declare class Calc_SPECIFYMASS_Dto {
    generalData: SpecifyMass['generalData'];
    step2Data: SpecifyMass['step2Data'];
}
export interface Calc_SPECIFYMASS_Out {
    bulk_specify_mass: number;
    apparent_specify_mass: number;
    absorption: number;
}
