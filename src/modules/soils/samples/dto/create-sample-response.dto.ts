import { ApiProperty } from '@nestjs/swagger';

export class SampleResponseDto {
  @ApiProperty({ description: 'Código único da amostra', example: 'SMP-001' })
  code: string;

  @ApiProperty({ description: 'Nome da amostra', example: 'Solo argiloso' })
  name: string;

  @ApiProperty({
    description: 'Tipo da amostra',
    example: 'inorganicSoil',
    enum: ['inorganicSoil', 'organicSoil', 'pavementLayer'],
  })
  type: 'inorganicSoil' | 'organicSoil' | 'pavementLayer';

  @ApiProperty({ description: 'Tipo de construção', example: 'Estrada', required: false })
  construction?: string;

  @ApiProperty({ description: 'Trecho da amostra', example: 'Trecho 1', required: false })
  snippet?: string;

  @ApiProperty({ description: 'Proveniência da amostra', example: 'Local X', required: false })
  provenance?: string;

  @ApiProperty({ description: 'Estaca associada', example: 'E-23', required: false })
  stake?: string;

  @ApiProperty({ description: 'Camada do solo', example: 'Camada superficial', required: false })
  layer?: string;

  @ApiProperty({ description: 'Profundidade em cm', example: 30, required: false })
  depth?: number;

  @ApiProperty({ description: 'Exd da amostra', example: 'EXD123', required: false })
  exd?: string;

  @ApiProperty({ description: 'Data da coleta', example: '2025-08-18' })
  collectionDate: string;

  @ApiProperty({ description: 'Descrição da amostra', example: 'Solo argiloso coletado próximo à estrada', required: false })
  description?: string;
}
