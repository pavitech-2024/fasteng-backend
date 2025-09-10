// src/modules/pro-medina/fwd/dto/create-fwd-analysis.dto.ts
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FwdSampleDto {
  @IsNotEmpty()
  stationNumber: number;

  @IsNotEmpty()
  d0: number;

  @IsNotEmpty()
  d20: number;

  @IsNotEmpty()
  d30: number;

  @IsNotEmpty()
  d45: number;

  @IsNotEmpty()
  d60: number;

  @IsNotEmpty()
  d90: number;

  @IsNotEmpty()
  d120: number;

  @IsNotEmpty()
  d150: number;

  @IsNotEmpty()
  d180: number;

  @IsOptional()
  date?: Date;

  @IsOptional()
  airTemperature?: number;

  @IsOptional()
  pavementTemperature?: number;

  @IsOptional()
  appliedLoad?: number;
}

export class CreateFwdAnalysisDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FwdSampleDto)
  samples: FwdSampleDto[];

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}