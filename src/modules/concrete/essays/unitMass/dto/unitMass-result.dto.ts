import { IsNotEmpty } from 'class-validator';
import { UnitMass } from '../schemas';

export class Result_UnitMass_Dto {
  @IsNotEmpty()
  generalData: UnitMass['generalData'];

  @IsNotEmpty()
  step2Data: UnitMass['step2Data'];
}

export interface UnitMass_Result {
  result: number;
}
