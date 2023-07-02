import { IsNotEmpty } from "class-validator";
import { Compression } from "../schema";


export class Calc_Compression_Dto {
  @IsNotEmpty()
  generalData: Compression['generalData'];

  @IsNotEmpty()
  step2Data: Compression['step2Data'];

}