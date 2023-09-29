import { IsNotEmpty } from "class-validator";
import { Abrasion } from "../schemas";

export class Calc_Abrasion_Dto {
  @IsNotEmpty()
  generalData: Abrasion['generalData'];

  @IsNotEmpty()
  abrasionCalc: Abrasion['abrasionCalc'];
}

export interface Calc_Abrasion_Out {
  losAngelesAbrasion: number
  alerts: string[];
}