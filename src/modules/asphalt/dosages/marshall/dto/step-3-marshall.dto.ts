import { IsNotEmpty } from "class-validator";

export class MarshallStep3Dto {
  @IsNotEmpty()
  dnitBand: string;

  @IsNotEmpty()
  aggregates: string[];
}