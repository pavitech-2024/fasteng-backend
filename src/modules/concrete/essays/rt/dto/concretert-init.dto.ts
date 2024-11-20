import { IsNotEmpty } from "class-validator";

export class ConcreteRtInitDto {
    @IsNotEmpty()
    name: string;
  }