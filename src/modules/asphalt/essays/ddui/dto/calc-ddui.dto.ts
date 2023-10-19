import { IsNotEmpty } from "class-validator";
import { Ddui } from "../schemas";

export class Calc_Ddui_Dto {
  @IsNotEmpty()
  generalData: Ddui['generalData'];

  @IsNotEmpty()
  ddui: Ddui['dduiStep2'];
}

export interface Calc_Ddui_Out {
  everyRtsMpa: any[], 
  everyRtsKgf: any[], 
  conditionedAverage: number,
  unconditionedAverage: number,
  rrt: number
}