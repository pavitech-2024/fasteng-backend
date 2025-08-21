// src/modules/asphalt/marshall/dto/calculate-dmt.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class CalculateDmtDTO {
  @ApiProperty({ description: 'Porcentagens de dosagem por material', type: [[Number]] })
  @IsArray()
  percentsOfDosage: number[][];

  @ApiProperty({ description: 'Agregados utilizados na mistura', type: [String] })
  @IsArray()
  aggregates: string[];

  @ApiProperty({ description: 'Índices de gravidade específica que faltam', type: [String] })
  @IsOptional()
  @IsArray()
  indexesOfMissesSpecificGravity?: string[];

  @ApiProperty({ description: 'Gravidade específica faltante para materiais', type: Object })
  @IsOptional()
  missingSpecificGravity?: Record<string, any>;

  @ApiProperty({ description: 'Trial number' })
  @IsNumber()
  trial: number;
}
