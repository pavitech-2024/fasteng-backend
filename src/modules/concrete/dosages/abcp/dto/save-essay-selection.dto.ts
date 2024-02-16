import { IsNotEmpty } from "class-validator";
import { ABCP } from "../schemas";

export class EssaySelectionDataDto {
  @IsNotEmpty()
  essaySelectionData: ABCP['essaySelectionData']
}