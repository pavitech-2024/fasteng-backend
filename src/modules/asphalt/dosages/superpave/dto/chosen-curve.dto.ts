import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GranulometryCompositionDto {
  @ApiProperty({ description: 'Expected PLI value' })
  @IsNumber()
  expectedPli: number;

  [key: string]: number;
}

export class ChosenCurvePercentagesRequestDto {
  @ApiProperty({ description: 'Granulometry composition data' })
  @IsObject()
  curve: GranulometryCompositionDto;

  @ApiProperty({ description: 'Traffic volume category', enum: ['low', 'medium', 'medium-high', 'high'] })
  @IsString()
  @IsNotEmpty()
  trafficVolume: string;

  @ApiProperty({ description: 'Percentage of dosage as key-value pairs' })
  @IsObject()
  percentsOfDosage: Record<string, string>;
}

export class ChosenCurvePercentagesDataDto {
  @ApiProperty({ description: 'Material name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'List of PLI values', type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  listOfPlis: number[];

  @ApiProperty({ description: 'Percentage aggregate matrix', type: [[Number]] })
  @IsArray()
  @IsArray({ each: true })
  @IsNumber({}, { each: true })
  porcentageAggregate: number[][];

  @ApiProperty({ description: 'Traffic volume category', enum: ['low', 'medium', 'medium-high', 'high'] })
  @IsString()
  @IsNotEmpty()
  trafficVolume: string;
}

export class SaveChosenCurveRequestDto {
  @ApiProperty({ description: 'Chosen curve percentages data' })
  @ValidateNested()
  @Type(() => ChosenCurvePercentagesDataDto)
  chosenCurvePercentagesData: ChosenCurvePercentagesDataDto;
}