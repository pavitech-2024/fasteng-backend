import { IsNotEmpty } from "class-validator";
import { SofteningPoint } from "../schemas";

export class Calc_SofteningPoint_Dto {
  @IsNotEmpty()
  generalData: SofteningPoint['generalData'];

  @IsNotEmpty()
  softeningPoint: SofteningPoint['softeningPoint'];
}

export interface Calc_SofteningPoint_Out {
  softeningPoint: number,
  indexOfSusceptibility: number,
  alerts: string[]
}