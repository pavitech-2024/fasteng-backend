import { IsNotEmpty } from 'class-validator';
import { Rtcd } from '../schemas';

export class Calc_Rtcd_Dto {
  @IsNotEmpty()
  generalData: Rtcd['generalData'];

  @IsNotEmpty()
  rtcdStep2: Rtcd['rtcdStep2'];

  @IsNotEmpty()
  rtcdStep3: Rtcd['rtcdStep3'];
}

export interface Calc_Rtcd_Out {
  //Lembrar de depois ver no Front para trocar o any pelo tipo certo
  everyRtsMpa: number[];
  everyRtsKgf: number[];
  average: number;
}
