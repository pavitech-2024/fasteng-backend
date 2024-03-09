import { IsNotEmpty } from 'class-validator';
import { Igg } from '../schemas';

export class Calc_Igg_Dto {
  @IsNotEmpty()
  generalData: Igg['generalData'];

  @IsNotEmpty()
  iggStep2: Igg['iggStep2'];

  @IsNotEmpty()
  iggStep3: Igg['iggStep3'];
}

export interface Calc_Igg_Out {
  iggs: number[];
  igis: number[];
  arrowsAverage: number[];
  variancesAverage: number[];
  conditions: string[];
  error: number;
}
