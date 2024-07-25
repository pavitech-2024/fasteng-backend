import { IsNotEmpty } from "class-validator";
import { ABCP } from "../schemas";


export class InsertParamsDataDto {
  @IsNotEmpty()
  insertParamsData: ABCP['insertParamsData']
}