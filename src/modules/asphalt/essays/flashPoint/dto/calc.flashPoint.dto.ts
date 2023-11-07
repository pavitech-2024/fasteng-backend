import { IsNotEmpty } from 'class-validator';
import { FlashPoint } from '../schemas';

export class Calc_FLASHPOINT_Dto {
  @IsNotEmpty()
  generalData: FlashPoint['generalData'];

  @IsNotEmpty()
  step2Data: FlashPoint['step2Data'];
}

export interface Calc_FLASHPOINT_Out {
  temperature: number;
}
