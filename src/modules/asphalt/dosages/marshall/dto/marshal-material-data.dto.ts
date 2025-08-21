import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsString } from 'class-validator';

export class AggregateDTO {
  @ApiProperty({ example: 'Brita 1' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'agg123' })
  @IsNotEmpty()
  @IsString()
  _id: string;
}

export class MarshallMaterialDataDTO {
  @ApiProperty({ type: [AggregateDTO] })
  @IsArray()
  aggregates: AggregateDTO[];

  @ApiProperty({ example: 'Asfalto CA-50' })
  @IsNotEmpty()
  @IsString()
  binder: string;
}
