import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ABCPInitDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  userId?: string

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  calculist?: string

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  laboratory?: string

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  description?: string

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  step: number
}