import { IsNotEmpty } from 'class-validator';
import { Angularity } from '../schemas';

export class Calc_ANGULARITY_Dto {
    @IsNotEmpty()
    generalData: Angularity['generalData'];

    @IsNotEmpty()
    step2Data: Angularity['step2Data'];
}

export interface Calc_ANGULARITY_Out {
    angularities : {label: string, angularity: number}[],
    averageOfAll: number,
    porcentagesOfVoids: number[],
    alerts: string[]
}
