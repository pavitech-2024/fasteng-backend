import { 
  IsArray, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  ValidateNested,
  IsNumber,
  IsObject
} from 'class-validator';
import { Type } from 'class-transformer';

class DefectCountDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}

class PavementStationDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  stationNumber: string;

  @IsNotEmpty()
  @IsString()
  section: string;

  @IsNotEmpty()
  @IsNumber()
  tri: number;

  @IsNotEmpty()
  @IsNumber()
  tre: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DefectCountDto)
  defects: DefectCountDto[];

  @IsOptional()
  @IsString()
  date?: string;
}

export class CreateIggAnalysisDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  road: string;

  @IsNotEmpty()
  @IsString()
  section: string;

  @IsOptional()
  @IsString()
  subtrack?: string;

  @IsNotEmpty()
  @IsString()
  pavementType: string;

  @IsNotEmpty()
  @IsString()
  evaluationDate: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PavementStationDto)
  stations: PavementStationDto[];

  @IsOptional()
  @IsObject()
  results?: Record<string, any>;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}