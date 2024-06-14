import { IsNotEmpty } from "class-validator/types/decorator/decorators";
import { Material } from "modules/concrete/materials/schemas";

export class ConcreteRtInitDto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    material: Material;
  }