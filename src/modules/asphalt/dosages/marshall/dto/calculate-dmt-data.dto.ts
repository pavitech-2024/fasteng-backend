import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IndexOfMissesSpecificGravityDTO } from './index-of-misses-specific-gravity.dto';
import { AggregateItemDTO } from './aggregate-item.dto';

export class CalculateDmtDataDTO {
  @ApiProperty({
    description: 'Índices de massas específicas faltantes',
    type: [IndexOfMissesSpecificGravityDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IndexOfMissesSpecificGravityDTO)
  indexesOfMissesSpecificGravity: IndexOfMissesSpecificGravityDTO[];

  @ApiProperty({
    description: 'Massas específicas faltantes por material',
    example: { material_1: 2.65, material_2: 2.70 },
  })
  @IsObject()
  missingSpecificGravity: Record<string, number>;

  @ApiProperty({
    description: 'Percentuais de dosagem por material',
    example: [[25, 26, 27, 28, 29], [75, 74, 73, 72, 71]],
  })
  @IsArray()
  percentsOfDosage: number[][];

  @ApiProperty({
    description: 'Lista de agregados',
    type: [AggregateItemDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AggregateItemDTO)
  aggregates: AggregateItemDTO[];

  @ApiProperty({
    description: 'Teor de ligante do ensaio',
    example: 5.0,
  })
  @IsNumber()
  trial: number;
}