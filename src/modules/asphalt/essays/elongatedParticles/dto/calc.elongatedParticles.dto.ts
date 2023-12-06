import { IsNotEmpty } from 'class-validator';
import { ElongatedParticles } from '../schemas';
import { ElongatedParticlesResultsDimensionsRow } from '../schemas';

export class Calc_ELONGATEDPARTICLES_Dto {
  @IsNotEmpty()
  generalData: ElongatedParticles['generalData'];

  @IsNotEmpty()
  step2Data: ElongatedParticles['step2Data'];
}

export interface Calc_ELONGATEDPARTICLES_Out {
  results_dimensions_table_data: ElongatedParticlesResultsDimensionsRow[];
  alerts: string[];
}
