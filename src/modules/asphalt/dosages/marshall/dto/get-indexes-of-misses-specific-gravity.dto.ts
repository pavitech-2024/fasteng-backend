import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AggregateItemDTO } from './aggregate-item.dto';

export class GetIndexesOfMissesSpecificGravityDTO {
  @ApiProperty({
    description: 'Lista de agregados',
    type: [AggregateItemDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AggregateItemDTO)
  aggregates: AggregateItemDTO[];
}