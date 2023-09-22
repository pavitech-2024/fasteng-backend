import { IsNotEmpty } from 'class-validator';
import { Granulometry } from '../schemas';

export class Calc_GRANULOMETRY_Dto {
  @IsNotEmpty()
  generalData: Granulometry['generalData'];

  @IsNotEmpty()
  step2Data: Granulometry['step2Data'];
}

export interface Calc_GRANULOMETRY_Out {
  accumulated_retained: number[];
  graph_data: [number, number][];
  passant: number[];
  retained_porcentage: number[];
  total_retained: number;
  nominal_diameter: number;
  nominal_size: number;
  fineness_module: number;
  cc: number;
  cnu: number;
  error: number;
}