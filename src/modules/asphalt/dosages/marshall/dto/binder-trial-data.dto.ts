import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty,IsBoolean, IsOptional, ValidateNested, IsNumber, IsArray} from 'class-validator';

export class TemperatureRangeDTO {
  @ApiProperty({ example: 150 })
  higher: number;

  @ApiProperty({ example: 140 })
  average: number;

  @ApiProperty({ example: 130 })
  lower: number;
}

export class BandsOfTemperaturesDTO {
  @ApiProperty({ type: TemperatureRangeDTO })
  machiningTemperatureRange: TemperatureRangeDTO;

  @ApiProperty({ type: TemperatureRangeDTO })
  compressionTemperatureRange: TemperatureRangeDTO;

  @ApiProperty({ type: TemperatureRangeDTO })
  AggregateTemperatureRange: TemperatureRangeDTO;
}
export class BinderTrialDataDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  trial: number;

  @ApiProperty({ type: [Object] })
  @IsArray()
  percentsOfDosage: any[];

  @ApiProperty({ type: [Object] })
  @IsArray()
  newPercentOfDosage: any[];

  @ApiProperty({ type: BandsOfTemperaturesDTO })
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