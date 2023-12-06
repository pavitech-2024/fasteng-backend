import { IsNotEmpty } from "class-validator";
import { Penetration } from "../schemas";

export class Calc_Penetration_Dto {
  @IsNotEmpty()
  generalData: Penetration['generalData'];

  @IsNotEmpty()
  penetrationCalc: Penetration['penetrationCalc'];
}

export interface Calc_Penetration_Out {
  penetration: number;
  cap: string;
  alerts: string;
  indexOfSusceptibility: number
}