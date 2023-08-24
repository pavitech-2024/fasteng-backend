import { IsNotEmpty } from 'class-validator';
import { Hrb } from '../schemas';

export class Calc_HRB_Dto {
  @IsNotEmpty()
  generalData: Hrb['generalData'];

  @IsNotEmpty()
  step2Data: Hrb['step2Data'];
}

export interface Calc_HRB_Out {
  plasticity_index: number;
  classification: string;
  group_index: number;
}
