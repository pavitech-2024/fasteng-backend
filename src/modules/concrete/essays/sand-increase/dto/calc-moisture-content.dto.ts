import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class MoistureContent {
  @IsNotEmpty()
  @IsNumber()
  sample: string

  @IsNotEmpty()
  @IsNumber()
  capsuleWeight: number

  @IsNotEmpty()
  @IsNumber()
  wetGrossWeight: number

  @IsNotEmpty()
  @IsNumber()
  dryGrossWeight: number

  @IsNotEmpty()
  @IsNumber()
  moistureContent: number
}

export class Calc_MoistureContent_Dto {
  tableData: MoistureContent[]
}
