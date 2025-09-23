import { 
  IsString, 
  IsOptional, 
  IsNumber, 
  Min, 
  Max, 
  IsUUID, 
  IsArray, 
  IsDate, 
  ValidateNested, 
  ValidateIf
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

class PreferencesDto {
  @IsString()
  @ApiProperty({ description: 'Idioma preferido do usuário', example: 'pt-BR' })
  language: string;

  @IsNumber()
  @ApiProperty({ description: 'Número de casas decimais preferido', example: 2 })
  decimal: number;
}

export class UpdateUserDto {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ description: 'ID do usuário', example: '123e4567-e89b-12d3-a456-426614174000' })
  _id?: string;

  @IsArray()
  @IsOptional()
  @IsDate({ each: true })
  @Type(() => Date)
  @ApiPropertyOptional({ description: 'Lista de datas de último login', type: [Date], example: ['2025-08-17T00:00:00Z'] })
  lastLoginList?: Date[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'URL da foto do usuário', example: 'https://example.com/photo.jpg', nullable: true })
  photo?: string | null;

  @IsNumber()
  @Min(1)
  @Max(3)
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ description: 'Número de conexões do usuário', minimum: 1, maximum: 3, example: 2 })
  connections?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => PreferencesDto)
  @ApiPropertyOptional({ description: 'Preferências do usuário', type: PreferencesDto })
  preferences?: PreferencesDto;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Nome do usuário', example: 'Maria Clara' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Email do usuário', example: 'maria@example.com' })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Telefone do usuário', example: '+55 81 99999-9999' })
  phone?: string;

  @IsOptional()
  @ValidateIf((obj) => obj.dob !== null && obj.dob !== '') // Só valida se não for null ou ''
  @IsDate()
  @Transform(({ value }) => {
    if (value === '' || value === null) {
      return null;
    }
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date; // Retorna null se a data for inválida
  })
  @ApiPropertyOptional({ description: 'Data de nascimento do usuário', type: Date, example: '1990-01-01T00:00:00Z', nullable: true })
  dob?: Date | null;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Versão do documento', example: 0 })
  __v?: number;
}


/*import { 
  IsString, 
  IsOptional, 
  IsNumber, 
  Min, 
  Max, 
  IsUUID, 
  IsArray, 
  IsDate, 
  ValidateNested, 
  ValidateIf
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PreferencesDto {
  @IsString()
  @ApiProperty({ description: 'Idioma preferido do usuário', example: 'pt-BR' })
  language: string;

@IsNumber()
  @ApiProperty({ description: 'Número de casas decimais preferido', example: 2 })
  decimal: number;
}

export class UpdateUserDto {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ description: 'ID do usuário', example: '123e4567-e89b-12d3-a456-426614174000' })
  _id?: string;

  @IsArray()
  @IsOptional()
  @IsDate({ each: true })
  @Type(() => Date)
  
  lastLoginList?: Date[];

  @IsOptional()
  @IsString()
  photo?: string | null;

  @IsNumber()
  @Min(1)
  @Max(3)
  @IsOptional()
  @Type(() => Number)
  connections?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => PreferencesDto)
  preferences?: PreferencesDto;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsOptional()
  @ValidateIf((obj) => obj.dob !== null && obj.dob !== '') // Só valida se não for null ou ''
  @IsDate()
  @Transform(({ value }) => {
    if (value === '' || value === null) {
      return null;
    }
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date; // Retorna null se a data for inválida
  })
  dob?: Date | null;

  @IsOptional()
  __v?: number;
}
function ApiPropertyOptional(arg0: { description: string; example: string; }): (target: UpdateUserDto, propertyKey: "_id") => void {
  throw new Error('Function not implemented.');
}
*/
