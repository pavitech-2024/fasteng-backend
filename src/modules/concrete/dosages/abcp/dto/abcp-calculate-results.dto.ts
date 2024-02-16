import { IsNotEmpty } from "class-validator";
import { ABCP } from "../schemas";

export class Calc_ABCP_Dto {
  @IsNotEmpty()
  generalData: ABCP['generalData']

  @IsNotEmpty()
  materialSelectionData: ABCP['materialSelectionData']

  @IsNotEmpty()
  essaySelectionData: ABCP['essaySelectionData']

  @IsNotEmpty()
  insertParamsData: ABCP['insertParamsData']
}

export interface Calc_ABCP_Out {
  fcj: number;
  ac: number;
  ca: number;
  cc: number;
  cb: number;
  careia: number;
  //Graph
  Xvalues: number[];
  Yvalues: number[];
  formula: string;
  resistanceCurve: string;
}

export class SaveAbcpDto {
  @IsNotEmpty()
  generalData: ABCP['generalData']

  @IsNotEmpty()
  materialSelectionData: ABCP['materialSelectionData']

  @IsNotEmpty()
  essaySelectionData: ABCP['essaySelectionData']

  @IsNotEmpty()
  insertParamsData: ABCP['insertParamsData']

  @IsNotEmpty()
  results: Calc_ABCP_Out
}

