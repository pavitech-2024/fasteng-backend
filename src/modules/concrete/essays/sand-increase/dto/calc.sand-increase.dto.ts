import { IsNotEmpty, IsNumber, ValidateIf } from "class-validator";
import { SandIncrease } from "../schema";


export class Calc_SandIncrease_Dto {
  @IsNotEmpty()
  @IsNumber()
  step: number

  @IsNotEmpty()
  generalData: SandIncrease['generalData'];

  @ValidateIf(obj => obj.step === 1)
  unitMassDeterminationData: SandIncrease['unitMassDeterminationData']

  @ValidateIf(obj => obj.step === 2)
  humidityFoundData: SandIncrease['humidityFoundData']
}

export interface Calc_SandIncrease_Out {
  unitMasses: number[];
  moistureContent: number[];
  swellings: number[];
  curve: any;
  retaR: any;
  retaS: any;
  retaT: any;
  retaU: any;
  averageCoefficient: number;
  criticalHumidity: number;
}