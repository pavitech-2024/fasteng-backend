import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sample } from '../../../samples/schemas';

export class GranulometryInitDto {
  @ApiProperty({
    description: "Nome da granulometria",
    example: "Granulometry Test 1"
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Amostra usada na granulometria",
    example: {
      id: "sample-123",
      type: "Areia Média",
      origin: "Rio Paraíba",
      weight: 500
    }
  })
  @IsNotEmpty()
  sample: Sample;
}











/*import { Sample } from '../../../samples/schemas';
import { IsNotEmpty } from 'class-validator';

export class GranulometryInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sample: Sample;
}*/