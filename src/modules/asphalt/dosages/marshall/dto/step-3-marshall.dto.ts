import { IsNotEmpty } from "class-validator";

export class MarshallStep3Dto {
  @IsNotEmpty()
  dnitBand: string;

@IsNotEmpty()
  percentageInputs: { [key: string]: number }[];

  @IsNotEmpty()
  aggregates: { _id: string, name: string }[];

  @IsNotEmpty()
  tableRows: any[];
}