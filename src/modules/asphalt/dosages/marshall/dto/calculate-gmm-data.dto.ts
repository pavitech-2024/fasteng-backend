import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GmmValueDTO } from './gmm-value.dto';
import { AggregateItemDTO } from './aggregate-item.dto';

export class CalculateGmmDataDTO {
  @ApiProperty({
    description: 'Valores do ensaio GMM',
    type: [GmmValueDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GmmValueDTO)
  gmm: GmmValueDTO[];

  @ApiProperty({
    description: 'Temperatura da água durante o ensaio GMM',
    example: 25.0,
  })
  @IsNumber()
  temperatureOfWaterGmm: number;

  @ApiProperty({
    description: 'Lista de agregados',
    type: [AggregateItemDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AggregateItemDTO)
  aggregates: AggregateItemDTO[];
}