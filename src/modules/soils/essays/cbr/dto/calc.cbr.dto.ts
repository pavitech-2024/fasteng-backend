import { IsNotEmpty } from 'class-validator';
import { Cbr } from '../schemas';

export class Calc_CBR_Dto {
  @IsNotEmpty()
  generalData: Cbr['generalData'];

  @IsNotEmpty()
  step2Data: Cbr['step2Data'];

  @IsNotEmpty()
  expansionData: Cbr['expansionData'];
}

export interface Calc_CBR_Out {
  measured_pressure: number[];
  cbr: number;
  cbrs: {
    2: number;
    4: number;
    6: number;
    8: number;
    10: number;
  };
  cbr_graph: [number, number][];
  free_expansion: number;
}
