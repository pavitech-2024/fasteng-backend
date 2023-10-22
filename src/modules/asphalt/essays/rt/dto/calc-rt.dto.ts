import { IsNotEmpty } from 'class-validator';
import { Rt } from '../schemas';

export class Calc_Rt_Dto {
  @IsNotEmpty()
  generalData: Rt['generalData'];

  @IsNotEmpty()
  rt: Rt['rtStep2'];
}

export interface Calc_Rt_Out {
  //Lembrar de depois ver no Front para trocar o any pelo tipo certo
  everyRtsMpa: any[];
  everyRtsKgf: any[];
  conditionedAverage: number;
  unconditionedAverage: number;
  rrt: number;
}
