import { IsNotEmpty } from 'class-validator';
import { Ductility } from '../schemas';

export class Calc_DUCTILITY_Dto {
    @IsNotEmpty()
    generalData: Ductility['generalData'];

    @IsNotEmpty()
    step2Data: Ductility['step2Data'];
}

export interface Calc_DUCTILITY_Out {
    ductility: number;
}
