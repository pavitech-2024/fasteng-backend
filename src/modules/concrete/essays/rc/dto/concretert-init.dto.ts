import { IsNotEmpty } from "class-validator";
import { Material } from "modules/asphalt/materials/schemas";

export class ConcreteRcInitDto {
    @IsNotEmpty()
    name: string;
  }