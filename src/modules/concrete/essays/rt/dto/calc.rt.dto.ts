import { IsNotEmpty } from "class-validator/types/decorator/decorators";
import { Rt } from "../schemas";

export class Calc_CONCRETERT_Dto {
    @IsNotEmpty()
    generalData: Rt['generalData'];
  
    @IsNotEmpty()
    step2Data: Rt['step2Data'];
  }
  
  export interface Calc_CONCRETERT_Out {
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