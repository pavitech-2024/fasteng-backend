import { IsNotEmpty } from 'class-validator';
import { Sucs } from '../schemas';

export class Calc_SUCS_Dto {
  @IsNotEmpty()
  generalData: Sucs['generalData'];

  @IsNotEmpty()
  step2Data: Sucs['step2Data'];
}

export interface Calc_SUCS_Out {
  cc: number,
  cnu: number,
  plasticity_index: number,
  classification: string,
}
