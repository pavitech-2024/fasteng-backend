import { IsNotEmpty } from 'class-validator';
import { RT } from '../schemas';

export class Calc_Concrete_RT_Dto {
  @IsNotEmpty()
  generalData: RT['generalData'];

  @IsNotEmpty()
  step2Data: RT['step2Data'][];

  @IsNotEmpty()
  step3Data: RT['step3Data'];

  @IsNotEmpty()
  step4Data: RT['step4Data'];
}

export interface Calc_Concrete_RT_Out {
  flexualTensileStrength: number;
  compressionResistance: number;
}
