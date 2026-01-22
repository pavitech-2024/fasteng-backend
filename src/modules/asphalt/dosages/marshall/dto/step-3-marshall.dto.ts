import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class AggregateDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439012' })
  _id: string;

  @ApiProperty({ example: 'Agregado Miúdo' })
  name: string;
}

export class MarshallStep3Dto {
  @ApiProperty({
    description: 'Banda DNIT',
    example: 'Banda A'
  })
  @IsNotEmpty()
  dnitBand: string;

  @ApiProperty({
    description: 'Lista de agregados',
    type: [AggregateDto],
    example: [
      { _id: '507f1f77bcf86cd799439012', name: 'Agregado Miúdo' },
      { _id: '507f1f77bcf86cd799439013', name: 'Agregado Graúdo' }
    ]
  })
  @IsNotEmpty()
  aggregates: { _id: string, name: string }[];
}






/*import { IsNotEmpty } from "class-validator";

export class MarshallStep3Dto {
  @IsNotEmpty()
  dnitBand: string;

  @IsNotEmpty()
  aggregates: { _id: string, name: string }[];
}*/