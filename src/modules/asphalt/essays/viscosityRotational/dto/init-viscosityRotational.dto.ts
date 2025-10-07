import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ViscosityRotationalInitDto {
  @ApiProperty({
    description: 'Nome do ensaio de viscosidade rotacional',
    example: 'Viscosity Rotational Test 1',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Material utilizado no ensaio de viscosidade rotacional',
    example: {
      id: 'material-123',
      type: 'CAP 50/70',
      origin: 'Refinaria XYZ',
      viscosity: 85,
      density: 1.03,
    },
  })
  @IsNotEmpty()
  material: Record<string, any>; // substitui o tipo Material apenas para o Swagger entender
}






/*import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../../../modules/asphalt/materials/schemas';

export class ViscosityRotationalInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  material: Material;
}
*/