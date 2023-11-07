import { IsNotEmpty } from "class-validator";
import { Adhesiveness } from "../schemas";

export class Calc_Adhesiveness_Dto {
  @IsNotEmpty()
  generalData: Adhesiveness['generalData'];

  @IsNotEmpty()
  adhesiveness: Adhesiveness['adhesiveness'];
}

export interface Calc_Adhesiveness_Out {
  filmDisplacement: boolean
}
