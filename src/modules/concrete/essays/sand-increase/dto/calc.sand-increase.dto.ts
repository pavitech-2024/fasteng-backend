import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
import { MoistureContentTableData, SandIncrease, UnitMassTableData } from "../schema";


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

export interface Calc_SandIncrease_Out {
  unitMasses: number[],
  moistureContent: number[],
  swellings: number[];
  curve: any;
  retaR: any;
  retaS: any;
  retaT: any;
  retaU: any;
  averageCoefficient: number;
  criticalHumidity: number;
}