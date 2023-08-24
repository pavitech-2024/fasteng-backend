import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CalculateUnitMassDto {
  @IsNotEmpty()
  @IsNumber()
  containerWeightSample: number

  @IsNotEmpty()
  @IsString()
  moistureContent: string

  @IsNotEmpty()
  @IsString()
  sample: string
}[]