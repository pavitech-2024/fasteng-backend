import { IsNotEmpty } from "class-validator";

export class CreateGranularLayersSampleDto {
  @IsNotEmpty()
  name: string;
}
