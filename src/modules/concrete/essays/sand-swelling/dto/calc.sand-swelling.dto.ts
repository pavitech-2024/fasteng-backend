import { IsNotEmpty } from "class-validator";
import { SandSwelling } from "../schema";


export class Calc_SandSwelling_Dto {
  @IsNotEmpty()
  generalData: SandSwelling['generalData'];
}

export interface Calc_SandSwelling_Out {}