import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, ValidateNested } from "class-validator"

export class Reference {
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsNumber()
  tolerance: number;
}

export class ConcreteRcInterpolationDto {
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsNumber()
  tolerance: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Reference)
  higherReference: Reference;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Reference)
  lowerReference: Reference;
}