import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class IndexOfMissesSpecificGravityDTO {
  @ApiProperty({
    description: 'Valor da massa específica',
    example: 2.65,
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'ID do material',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  _id: string;

  @ApiProperty({
    description: 'Nome do material',
    example: 'Areia Média',
  })
  @IsString()
  name: string;
}