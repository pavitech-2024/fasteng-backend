import { IsNotEmpty } from 'class-validator';
import { BinderAsphaltConcrete_Sample } from '../schemas';

export class CreateBinderAsphaltConcreteSampleDto {
  @IsNotEmpty()
  generalData: BinderAsphaltConcrete_Sample['generalData'];

  @IsNotEmpty()
  step3Data: BinderAsphaltConcrete_Sample['step3Data'];

  @IsNotEmpty()
  step4Data: BinderAsphaltConcrete_Sample['step4Data'];

  @IsNotEmpty()
  step5Data: BinderAsphaltConcrete_Sample['step5Data'];
}