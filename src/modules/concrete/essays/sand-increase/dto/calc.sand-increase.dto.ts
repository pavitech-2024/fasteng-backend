import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
import { MoistureContentTableData, SandIncrease, UnitMassTableData } from "../schema";
import { Type } from "class-transformer";


export class Calc_SandIncrease_Dto {
  @IsNotEmpty()
  sandIncreaseGeneralData: SandIncrease['generalData'];

  @ValidateIf(obj => obj.step === 1)
  unitMassDeterminationData: SandIncrease['unitMassDeterminationData']

  @ValidateIf(obj => obj.step === 2)
  humidityFoundData: SandIncrease['humidityFoundData']
}

export class Calc_UnitMassDto {
  @IsNotEmpty()
  @IsString()
  containerVolume: string

  @IsNotEmpty()
  @IsString()
  containerWeight: string

  @IsNotEmpty()
  @IsArray()
  tableData: UnitMassTableData[]
}

export class Calc_MoistureContentDto {
  @IsNotEmpty()
  @IsArray()
  tableData: MoistureContentTableData[]
}

export class Save_SandIncreaseDto {
  @IsNotEmpty()
  generalData: SandIncrease['generalData'];

  @IsNotEmpty()
  unitMassDeterminationData: SandIncrease['unitMassDeterminationData']

  @IsNotEmpty()
  humidityFoundData: SandIncrease['humidityFoundData']

  @IsNotEmpty()
  results: SandIncrease['results']
}

export interface Calc_SandIncrease_Out {
  unitMasses: number[],
  moistureContent: number[],
  swellings: number[];
  curve: [number, number][];
  retaR: [number, number][];
  retaS: [number, number][];
  retaT: [number, number][];
  retaU: [number, number][];
  averageCoefficient: number;
  criticalHumidity: number;
}