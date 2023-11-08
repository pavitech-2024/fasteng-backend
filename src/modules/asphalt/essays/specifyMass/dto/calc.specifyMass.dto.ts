import { IsNotEmpty } from 'class-validator';
import { SpecifyMass } from '../schemas';

export class Calc_SPECIFYMASS_Dto {
  @IsNotEmpty()
  generalData: SpecifyMass['generalData'];

  @IsNotEmpty()
  step2Data: SpecifyMass['step2Data'];
}

export interface Calc_SPECIFYMASS_Out {
  bulk_specify_mass: number;
  apparent_specify_mass: number;
  absorption: number;
}
