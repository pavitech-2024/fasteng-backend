import { IsNotEmpty } from "class-validator";
import { Material } from "modules/concrete/materials/schemas";

export class ConcreteRtInitDto {
    @IsNotEmpty()
    name: string;
  }