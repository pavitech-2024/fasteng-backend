import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from "class-validator"

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