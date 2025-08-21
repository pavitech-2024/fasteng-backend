import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class AggregateItemDTO {
  @ApiProperty({
    description: 'ID do agregado',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  _id: string;

  @ApiProperty({
    description: 'Nome do agregado',
    example: 'Pedra Brita 1',
  })
  @IsString()
  name: string;
}