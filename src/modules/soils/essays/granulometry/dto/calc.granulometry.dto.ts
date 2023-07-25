import { IsNotEmpty } from 'class-validator';
import { Granulometry } from '../schemas';

export class Calc_GRANULOMETRY_Dto {
  @IsNotEmpty()
  generalData: Granulometry['generalData'];

  @IsNotEmpty()
  step2Data: Granulometry['step2Data'];
}

export interface Calc_GRANULOMETRY_Out {
  
}