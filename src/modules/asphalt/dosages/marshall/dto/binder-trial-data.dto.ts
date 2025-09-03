import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { 
  IsString, 
  IsNotEmpty, 
  IsBoolean, 
  IsOptional, 
  ValidateNested, 
  IsNumber, 
  IsArray, 
  ValidateNested as ValidateNestedDecorator,
  IsObject
} from 'class-validator';

export class TemperatureRangeDTO {
  @ApiProperty({ example: 150 })
  @IsNumber() // ← FALTAVA
  higher: number;

  @ApiProperty({ example: 140 })
  @IsNumber() // ← FALTAVA
  average: number;

  @ApiProperty({ example: 130 })
  @IsNumber() // ← FALTAVA
  lower: number;
}

export class BandsOfTemperaturesDTO {
  @ApiProperty({ type: TemperatureRangeDTO })
  @ValidateNested() // ← FALTAVA
  @Type(() => TemperatureRangeDTO) // ← FALTAVA
  machiningTemperatureRange: TemperatureRangeDTO;

  @ApiProperty({ type: TemperatureRangeDTO })
  @ValidateNested() // ← FALTAVA
  @Type(() => TemperatureRangeDTO) // ← FALTAVA
  compressionTemperatureRange: TemperatureRangeDTO;

  @ApiProperty({ type: TemperatureRangeDTO })
  @ValidateNested() // ← FALTAVA
  @Type(() => TemperatureRangeDTO) // ← FALTAVA
  AggregateTemperatureRange: TemperatureRangeDTO;
}

export class PercentDosageDTO {
  @IsNumber()
  percent: number;

  @IsNumber()
  mass: number;
}

export class BinderTrialDataDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  trial: number;

  @ApiProperty({ type: [PercentDosageDTO] })
  @IsArray()
  @ValidateNested({ each: true }) // ← FALTAVA
  @Type(() => PercentDosageDTO) // ← FALTAVA
  percentsOfDosage: PercentDosageDTO[];

  @ApiProperty({ type: [PercentDosageDTO] })
  @IsArray()
  @ValidateNested({ each: true }) // ← FALTAVA
  @Type(() => PercentDosageDTO) // ← FALTAVA
  newPercentOfDosage: PercentDosageDTO[];

  @ApiProperty({ type: BandsOfTemperaturesDTO })
  @ValidateNested() // ← FALTAVA
  @Type(() => BandsOfTemperaturesDTO) // ← FALTAVA
  bandsOfTemperatures: BandsOfTemperaturesDTO; 

  @ApiProperty({ description: 'Binder usado' })
  @IsString()
  @IsNotEmpty()
  binder: string;
}

export class SaveMarshallDosageDTO {
  @ApiProperty({ type: BinderTrialDataDTO })
  @ValidateNested()
  @Type(() => BinderTrialDataDTO)
  data: BinderTrialDataDTO;

  @ApiPropertyOptional({ description: 'Indica se é apenas uma consulta' })
  @IsOptional()
  @IsBoolean()
  isConsult?: boolean;
}