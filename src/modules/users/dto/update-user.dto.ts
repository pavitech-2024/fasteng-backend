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

class PreferencesDto {
  @IsString()
  language: string;

  @IsNumber()
  decimal: number;
}

export class UpdateUserDto {
  @IsUUID()
  @IsOptional()
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
