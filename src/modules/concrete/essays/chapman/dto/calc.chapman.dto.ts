import { IsNotEmpty } from 'class-validator';
import { Chapman } from '../schemas';

export class Calc_CHAPMAN_dto {
  @IsNotEmpty()
  generalData: Chapman['generalData'];

  @IsNotEmpty()
  step2Data: Chapman['step2Data'];
}

export interface Calc_CHAPMAN_Out {
  m_e: number;
}
