import { IsNotEmpty } from "class-validator";
import { RC } from "../schemas";

export class Calc_CONCRETERC_Dto {
    @IsNotEmpty()
    generalData: RC['generalData'];
  
    @IsNotEmpty()
    step2Data: RC['step2Data'];
  }
  
  export interface Calc_CONCRETERC_Out {
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