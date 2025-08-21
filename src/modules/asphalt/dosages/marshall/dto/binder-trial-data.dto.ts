import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

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
