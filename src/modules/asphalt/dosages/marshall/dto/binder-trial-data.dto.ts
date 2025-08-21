import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsBoolean } from 'class-validator';

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