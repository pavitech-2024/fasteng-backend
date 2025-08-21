import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GmmValueDTO {
  @ApiProperty({
    description: 'ID do item GMM',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Valor do GMM (opcional)',
    example: 2.45,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty({
    description: 'Massa da amostra seca (opcional)',
    example: 1200.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  massOfDrySample?: number;

  @ApiProperty({
    description: 'Massa do recipiente + água + amostra (opcional)',
    example: 2500.3,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  massOfContainerWaterSample?: number;

  @ApiProperty({
    description: 'Massa do recipiente + água (opcional)',
    example: 2000.1,
  })
  @IsOptional()
  @IsNumber()
  massOfContainerWater?: number;
}