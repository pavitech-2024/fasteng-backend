import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Material } from '../../../../../modules/concrete/materials/schemas';

export class ConcreteGranulometryInitDto {
  @ApiProperty({
    description: "Nome da granulometria de concreto",
    example: "Concrete Granulometry Test 1"
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Material usado na granulometria de concreto",
    example: {
      id: "material-123",
      type: "Brita 1",
      origin: "Pedreira XYZ",
      weight: 1200
    }
  })
  @IsNotEmpty()
  material: Material;
}








/*import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../../../modules/concrete/materials/schemas';

export class ConcreteGranulometryInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  material: Material;
}*/