import { IsNotEmpty } from 'class-validator';
import { Rtcd } from '../schemas';

export class Calc_Rtcd_Dto {
  @IsNotEmpty()
  generalData: Rtcd['generalData'];

  @IsNotEmpty()
  rtcd: Rtcd['rtcdStep2'];
}

export interface Calc_Rtcd_Out {
  //Lembrar de depois ver no Front para trocar o any pelo tipo certo
  everyRtcdsMpa: any[];
  everyRtcdsKgf: any[];
  conditionedAverage: number;
  unconditionedAverage: number;
  rrt: number;
}
