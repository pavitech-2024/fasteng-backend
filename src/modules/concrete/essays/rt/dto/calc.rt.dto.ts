import { IsNotEmpty } from 'class-validator';
import { RT } from '../schemas';

export class Calc_Concrete_RT_Dto {
  @IsNotEmpty()
  generalData: RT['generalData'];

  @IsNotEmpty()
  step2Data: RT['concreteRtStep2'];

  @IsNotEmpty()
  step3Data: RT['concreteRtStep3'];
}

export interface Calc_Concrete_RT_Out {
  everyRtsMpa: number[];
  everyRtsKgf: number[];
  average: number;
}
