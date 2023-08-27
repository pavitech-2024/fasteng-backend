import { IsNotEmpty, IsNumber } from "class-validator";
import { SandSwelling } from "../schema";
import { MoistureContent } from "./calc-moisture-content.dto";
import { CalculateUnitMassTableDataDto } from "./calc-unit-mass.dto";


export class Calc_SandSwelling_Dto {
  @IsNotEmpty()
  @IsNumber()
  step: number

  @IsNotEmpty()
  generalData: SandSwelling['generalData'];

  unitMassDeterminationData: SandSwelling['unitMassDeterminationData']

  moistureContentData: SandSwelling['moistureContentData']
}

export interface Calc_SandSwelling_Out {
  unitMasses: number[];
  moistureContent: MoistureContent[];
  swellings: number[];
  curve: any;
  retaR: any;
  retaS: any;
  retaT: any;
  retaU: any;
  averageCoefficient: number;
  criticalHumidity: number;
}

export class Calculation {
  @IsNotEmpty()
  @IsNumber()
  step: number
}

export class UnitMass {
  containerVolume: number
  containerWeight: number
  tableData: CalculateUnitMassTableDataDto
}