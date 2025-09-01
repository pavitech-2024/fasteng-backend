import { IsNotEmpty, IsOptional, IsIn, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSampleDto {
  @ApiProperty({ description: 'Nome da amostra', example: 'Solo argiloso' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Tipo da amostra',
    example: 'inorganicSoil',
    enum: ['inorganicSoil', 'organicSoil', 'pavementLayer'],
  })
  @IsIn(['inorganicSoil', 'organicSoil', 'pavementLayer'])
  type: 'inorganicSoil' | 'organicSoil' | 'pavementLayer';

  @ApiProperty({ description: 'Tipo de construção', example: 'Estrada', required: false })
  @IsOptional()
  @IsString()
  construction?: string;

  @ApiProperty({ description: 'Trecho da amostra', example: 'Trecho 1', required: false })
  @IsOptional()
  @IsString()
  snippet?: string;

  @ApiProperty({ description: 'Proveniência da amostra', example: 'Local X', required: false })
  @IsOptional()
  @IsString()
  provenance?: string;

  @ApiProperty({ description: 'Estaca associada', example: 'E-23', required: false })
  @IsOptional()
  @IsString()
  stake?: string;

  @ApiProperty({ description: 'Camada do solo', example: 'Camada superficial', required: false })
  @IsOptional()
  @IsString()
  layer?: string;

  @ApiProperty({ description: 'Profundidade em cm', example: 30, required: false })
  @IsOptional()
  @IsNumber()
  depth?: number; // cm

  @ApiProperty({ description: 'Exd da amostra', example: 'EXD123', required: false })
  @IsOptional()
  @IsString()
  exd?: string;

  @ApiProperty({ description: 'Data da coleta', example: '2025-08-18' })
  @IsNotEmpty()
  @IsString()
  collectionDate: string;

  @ApiProperty({ description: 'Descrição da amostra', example: 'Solo argiloso coletado próximo à estrada', required: false })
  @IsOptional()
  @IsString()
  description?: string; 
}



/*import { IsNotEmpty } from 'class-validator';

export class CreateSampleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  type: 'inorganicSoil' | 'organicSoil' | 'pavementLayer';
  construction?: string;
  snippet?: string;
  provenance?: string;
  stake?: string;
  layer?: string;
  depth?: number; //cm
  exd?: string;
  collectionDate: string;
  description?: string;
}*/
