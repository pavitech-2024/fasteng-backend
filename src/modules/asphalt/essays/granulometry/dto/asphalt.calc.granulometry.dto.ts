import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import { AsphaltGranulometry } from "../schemas";

export class Calc_AsphaltGranulometry_Dto {
  @IsNotEmpty()
  generalData: AsphaltGranulometry['generalData'];

  @IsNotEmpty()
  step2Data: AsphaltGranulometry['step2Data'];

  @IsBoolean()
  @IsOptional()
  isSuperpave?: boolean;
}


export interface Calc_AsphaltGranulometry_Out {
  accumulated_retained: [string, number][];
  graph_data: [number, number][];
  passant: [string, number][];
  retained_porcentage: [string, number][];
  passant_porcentage: [string, number][];
  total_retained: number;
  nominal_diameter: number;
  nominal_size: number;
  fineness_module: number;
  cc: number;
  cnu: number;
  error: number;
}