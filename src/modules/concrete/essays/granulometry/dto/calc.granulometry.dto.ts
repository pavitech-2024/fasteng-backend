import { IsNotEmpty } from 'class-validator';
import { ConcreteGranulometry } from '../schemas';

export class Calc_ConcreteGranulometry_Dto {
  @IsNotEmpty()
  generalData: ConcreteGranulometry['generalData'];

  @IsNotEmpty()
  step2Data: ConcreteGranulometry['step2Data'];
}

export interface Calc_ConcreteGranulometry_Out {
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