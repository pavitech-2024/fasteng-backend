import { IsNotEmpty } from "class-validator";
import { GranularLayers_Sample } from "../schemas";

export class CreateGranularLayersSampleDto {
  @IsNotEmpty()
  generalData: GranularLayers_Sample['generalData'];

  @IsNotEmpty()
  step2Data: GranularLayers_Sample['step2Data'];

  @IsNotEmpty()
  step3Data: GranularLayers_Sample['step3Data'];
}
