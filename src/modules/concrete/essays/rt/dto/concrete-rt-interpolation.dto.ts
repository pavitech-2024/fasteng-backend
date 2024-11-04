import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class Reference {
  @IsNotEmpty()
  @IsNumber()
  ruptureAge: number;

  @IsNotEmpty()
  @IsNumber()
  tolerance: number
}

export class ConcreteRtInterpolationDto {
  @IsNotEmpty()
  @Type(() => Reference)
  higherReference: Reference;

  @IsNotEmpty()
  @Type(() => Reference)
  lowerReference: Reference;

  @IsNotEmpty()
  @IsNumber()
  age: number

  @IsOptional()
  @IsNumber()
  tolerance: number
}