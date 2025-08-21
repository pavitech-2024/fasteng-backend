import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

export class MarshallGeneralDataDTO {
  @ApiProperty({ example: 'user123', description: 'ID do usuário' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ example: 'Ensaios Superpave', description: 'Nome do ensaio' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Lab X', description: 'Laboratório responsável' })
  @IsOptional()
  @IsString()
  laboratory?: string;

  @ApiPropertyOptional({ example: 'João', description: 'Operador responsável' })
  @IsOptional()
  @IsString()
  operator?: string;

  @ApiPropertyOptional({ example: 'Carlos', description: 'Calculista' })
  @IsOptional()
  @IsString()
  calculist?: string;

  @ApiProperty({ example: 'bearing', enum: ['bearing', 'bonding'] })
  @IsNotEmpty()
  @IsIn(['bearing', 'bonding'])
  objective: 'bearing' | 'bonding';

  @ApiProperty({ example: 'A', enum: ['A', 'B', 'C'] })
  @IsNotEmpty()
  @IsIn(['A', 'B', 'C'])
  dnitBand: 'A' | 'B' | 'C';

  @ApiPropertyOptional({ example: 'Descrição do ensaio' })
  @IsOptional()
  @IsString()
  description?: string;
}
