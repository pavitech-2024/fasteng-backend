import { IsNotEmpty } from "class-validator";
import { StabilizedLayers_Sample } from "../schemas";


export class CreateStabilizedLayersSampleDto {
  @IsNotEmpty()
  generalData: StabilizedLayers_Sample['generalData'];

  @IsNotEmpty()
  step2Data: StabilizedLayers_Sample['step2Data'];

  @IsNotEmpty()
  step3Data: StabilizedLayers_Sample['step3Data'];
}