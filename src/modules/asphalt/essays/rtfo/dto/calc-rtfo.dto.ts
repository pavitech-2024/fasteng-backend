import { IsNotEmpty } from "class-validator";
import { Rtfo } from "../schemas";

export class Calc_Rtfo_Dto {
  @IsNotEmpty()
  generalData: Rtfo['generalData'];

  @IsNotEmpty()
  rtfo: Rtfo['rtfo'];
}

export interface Calc_Rtfo_Out {
    list: {
      initialSetWeight: number,
      weightLoss: number
    }[],
    weightLossAverage: number,
    alerts: string[]
}