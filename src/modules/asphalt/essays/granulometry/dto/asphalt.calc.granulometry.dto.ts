import { IsNotEmpty } from "class-validator";
import { AsphaltGranulometry } from "../schemas";

export class Calc_AsphaltGranulometry_Dto {
  @IsNotEmpty()
  generalData: AsphaltGranulometry['generalData'];

  @IsNotEmpty()
  step2Data: AsphaltGranulometry['step2Data'];
}

export interface Calc_AsphaltGranulometry_Out {
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