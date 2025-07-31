import { ElongatedParticles } from '../schemas';
import { ElongatedParticlesResultsDimensionsRow } from '../schemas';
export declare class Calc_ELONGATEDPARTICLES_Dto {
    generalData: ElongatedParticles['generalData'];
    step2Data: ElongatedParticles['step2Data'];
}
export interface Calc_ELONGATEDPARTICLES_Out {
    results_dimensions_table_data: ElongatedParticlesResultsDimensionsRow[];
    alerts: string[];
}
