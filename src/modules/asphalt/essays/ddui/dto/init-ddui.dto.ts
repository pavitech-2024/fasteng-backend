import { IsNotEmpty, IsString } from "class-validator";

export class DduiInitDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}