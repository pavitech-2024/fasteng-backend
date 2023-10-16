import { IsNotEmpty } from 'class-validator';
import { ShapeIndex } from '../schemas';

export class Calc_SHAPEINDEX_Dto {
  @IsNotEmpty()
  generalData: ShapeIndex['generalData'];

  @IsNotEmpty()
  step2Data: ShapeIndex['step2Data'];
}

export interface Calc_SHAPEINDEX_Out {
  shapeIndex: number;
}
