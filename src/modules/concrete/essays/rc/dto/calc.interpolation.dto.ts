import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"

export class toleranceReference {
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsNumber()
  tolerance: number;
}

export class correctionFactorReference {
  @IsNotEmpty()
  @IsNumber()
  diammHeighRatio: number

  @IsNotEmpty()
  @IsNumber()
  correctionFactor: number
}

export class ConcreteRcInterpolationDto {
  @IsNotEmpty()
  @IsNumber()
  age_diammHeightRatio: number;

  @IsOptional()
  @IsNumber()
  tolerance_strenght: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => toleranceReference || correctionFactorReference)
  higherReference: toleranceReference | correctionFactorReference;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => toleranceReference || correctionFactorReference)
  lowerReference: toleranceReference | correctionFactorReference;

  @IsNotEmpty()
  @IsString()
  type: string
}