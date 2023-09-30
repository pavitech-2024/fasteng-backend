import { IsNotEmpty } from "class-validator";
import { Adhesion } from "../schemas";

export class Calc_Adhesion_Dto {
  @IsNotEmpty()
  generalData: Adhesion['generalData'];

  @IsNotEmpty()
  adhesiveness: Adhesion['adhesiveness'];
}

export interface Calc_Adhesion_Out {
  filmDisplacement: boolean
}
