import { IsNotEmpty } from 'class-validator';
import { RC } from '../schemas';

export class Calc_CONCRETERC_Dto {
  @IsNotEmpty()
  generalData: RC['generalData'];

  @IsNotEmpty()
  step2Data: RC['step2Data'];

  @IsNotEmpty()
  step3Data: RC['step3Data'];
}

export interface Calc_CONCRETERC_Out {
  tolerances: number[];
  correctionFactors: number[]
  finalResult: number[]
}
