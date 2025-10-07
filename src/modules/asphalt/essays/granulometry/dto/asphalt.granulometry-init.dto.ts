import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Material } from "../../../../../modules/asphalt/materials/schemas";

export class AsphaltGranulometryInitDto {
  @ApiProperty({
    description: "Nome da granulometria",
    example: "Granulometry 1"
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Material usado na granulometria",
    example: {
      id: "mat-123",
      type: "Asfalto CAP 50/70",
      density: 2.65,
      supplier: "Construtora XYZ"
    }
  })
  @IsNotEmpty()
  material: Material;
}







/*import { IsNotEmpty } from "class-validator";
import { Material } from "../../../../../modules/asphalt/materials/schemas";

export class AsphaltGranulometryInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  material: Material;
}*/