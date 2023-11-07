import { IsNotEmpty } from "class-validator";
import { SandEquivalent } from "../schemas";

export class Calc_SandEquivalent_Dto {
  @IsNotEmpty()
  generalData: SandEquivalent['generalData'];

  @IsNotEmpty()
  sandEquivalent: SandEquivalent['sandEquivalent'];
}

export interface Calc_SandEquivalent_Out {
  sandEquivalent: number,
  alerts: string[]
}