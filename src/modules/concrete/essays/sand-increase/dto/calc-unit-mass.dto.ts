import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CalculateUnitMassDto {
  @IsNotEmpty()
  @IsNumber()
  containerVolume: number

  @IsOptional()
  @IsNumber()
  containerWeight: number

  tableData: CalculateUnitMassTableDataDto[]
}

export class CalculateUnitMassTableDataDto {
  @IsNotEmpty()
  @IsNumber()
  containerWeightSample: number

  @IsNotEmpty()
  @IsString()
  moistureContent: string

  @IsNotEmpty()
  @IsString()
  sample: string
}

export class CalculateUnitMassTableDataDtoTest {
  @IsNotEmpty()
  @IsNumber()
  containerWeightSample: number

  @IsNotEmpty()
  @IsString()
  moistureContent: string

  @IsNotEmpty()
  @IsString()
  sample: string

  @IsNotEmpty()
  unitMass: null
}