import { IsNotEmpty } from "class-validator";
import { Material } from "modules/asphalt/materials/schemas";

export class AdhesionInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  material: Material;
}