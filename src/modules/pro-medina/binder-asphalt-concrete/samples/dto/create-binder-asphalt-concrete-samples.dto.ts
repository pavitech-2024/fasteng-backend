import { IsNotEmpty } from 'class-validator';
import { BinderAsphaltConcrete_Sample } from '../schemas';

export class CreateBinderAsphaltConcreteSampleDto {
  @IsNotEmpty()
  generalData: BinderAsphaltConcrete_Sample['generalData'];

  @IsNotEmpty()
  step2Data: BinderAsphaltConcrete_Sample['step2Data'];

  @IsNotEmpty()
  step3Data: BinderAsphaltConcrete_Sample['step3Data'];

  @IsNotEmpty()
  step4Data: BinderAsphaltConcrete_Sample['step4Data'];
}
