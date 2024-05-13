import { IsNotEmpty } from "class-validator";

export class SuperpaveStep3Dto {
  @IsNotEmpty()
  dnitBand: string;

  @IsNotEmpty()
  aggregates: { _id: string, name: string }[];
}
