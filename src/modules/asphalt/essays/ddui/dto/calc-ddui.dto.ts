import { IsNotEmpty } from "class-validator";
import { Ddui } from "../schemas";

export class Calc_Ddui_Dto {
  @IsNotEmpty()
  generalData: Ddui['generalData'];

  @IsNotEmpty()
  dduiStep2: Ddui['dduiStep2'];

  @IsNotEmpty()
  dduiStep3: Ddui['dduiStep3']
}

export interface Calc_Ddui_Out {
  everyRtsMpa: any[], 
  everyRtsKgf: any[], 
  conditionedAverage: number,
  unconditionedAverage: number,
  rrt: number
}