import { IsNotEmpty } from "class-validator";
import { ABCP } from "../schemas";

export class MaterialSelectionDataDto {
  @IsNotEmpty()
  materialSelectionData: ABCP['materialSelectionData']
}