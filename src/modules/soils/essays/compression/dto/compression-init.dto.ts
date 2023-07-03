import { IsNotEmpty } from "class-validator";
import { Sample } from "modules/soils/samples/schemas";


export class CompressionInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sample: Sample
}