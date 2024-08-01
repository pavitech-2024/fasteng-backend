import { IsNotEmpty } from "class-validator";

type AggregateData = {
  id: string,
  type: string
}

type CementData = {
  id: string,
  type: string
}

export class ABCPEssaySelectionDto {
  @IsNotEmpty()
  coarseAggregate: AggregateData;

  @IsNotEmpty()
  fineAggregate: AggregateData;

  @IsNotEmpty()
  cement: CementData;
}