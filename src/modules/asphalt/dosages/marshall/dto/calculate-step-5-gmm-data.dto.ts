// src/modules/asphalt/marshall/dto/calculate-gmm.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class GmmItemDTO {
  @ApiProperty({ description: 'ID do ensaio' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Valor do GMM' })
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty({ description: 'Massa do recipiente com água e amostra' })
  @IsNumber()
  massOfContainer_Water_Sample: number;

  @ApiProperty({ description: 'Massa do recipiente com água' })
  @IsNumber()
  massOfContainer_Water: number;

  @ApiProperty({ description: 'Massa da amostra seca' })
  @IsNumber()
  massOfDrySample: number;
}

export class CalculateGmmDTO {
  @ApiProperty({ description: 'Valores de GMM', type: [GmmItemDTO] })
  @IsArray()
  gmm: GmmItemDTO[];

  @ApiProperty({ description: 'Temperatura da água utilizada' })
  @IsNumber()
  temperatureOfWaterGmm: number;

  @ApiProperty({ description: 'IDs dos agregados utilizados', type: [String] })
  @IsArray()
  aggregates: string[];
}
