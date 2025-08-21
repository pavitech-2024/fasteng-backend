import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MaxSpecificGravityResultDTO {
  @ApiProperty({ example: 2.45 })
  @IsNumber()
  lessOne: number;

  @ApiProperty({ example: 2.47 })
  @IsNumber()
  lessHalf: number;

  @ApiProperty({ example: 2.49 })
  @IsNumber()
  normal: number;

  @ApiProperty({ example: 2.51 })
  @IsNumber()
  plusHalf: number;

  @ApiProperty({ example: 2.53 })
  @IsNumber()
  plusOne: number;
}

class MaxSpecificGravityDTO {
  @ApiProperty({ type: MaxSpecificGravityResultDTO })
  @ValidateNested()
  @Type(() => MaxSpecificGravityResultDTO)
  result: MaxSpecificGravityResultDTO;

  @ApiProperty({ example: 'DMT' })
  @IsString()
  method: string;
}

export class SaveMaximumMixtureDensityDataDTO {
  @ApiProperty({ example: 'Dosagem Marshall - Teste 1' })
  @IsString()
  name: string;

  @ApiProperty({ type: MaxSpecificGravityDTO, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => MaxSpecificGravityDTO)
  maxSpecificGravity?: MaxSpecificGravityDTO;

  @ApiProperty({ type: [Number], required: false, example: [2.65, 2.70, 2.68] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  listOfSpecificGravities?: number[];
}