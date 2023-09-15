import { IsNotEmpty } from 'class-validator';
import { SoilsGranulometry } from '../schemas';

export class Calc_SoilsGranulometry_Dto {
  @IsNotEmpty()
  generalData: SoilsGranulometry['generalData'];

  @IsNotEmpty()
  step2Data: SoilsGranulometry['step2Data'];
}

export interface Calc_SoilsGranulometry_Out {
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