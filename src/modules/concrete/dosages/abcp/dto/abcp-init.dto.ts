import { IsNotEmpty, IsNumber } from "class-validator";

export class ABCPInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  userId: string
}