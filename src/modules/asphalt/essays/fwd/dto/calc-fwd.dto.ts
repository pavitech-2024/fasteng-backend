import { IsNotEmpty } from 'class-validator';
import { Fwd } from '../schema';

export class Calc_Fwd_Dto {
  @IsNotEmpty()
  generalData: Fwd['generalData'];

  @IsNotEmpty()
  fwdStep2: Fwd['fwdStep2'];

  @IsNotEmpty()
  fwdStep3: Fwd['fwdStep3'];
}

export interface Calc_Fwd_Out {
  processedData: any[];
  graphData: number[][];
  deletedPositions: number[];
}
