import { IggRepository } from '../repository';
import { Calc_Igg_Dto, Calc_Igg_Out } from '../dto/calc-igg.dto';
export declare class Calc_Igg_Service {
    private readonly iggRepository;
    private logger;
    constructor(iggRepository: IggRepository);
    calculateIgg({ iggStep3, iggStep4 }: Calc_Igg_Dto): Promise<{
        success: boolean;
        result: Calc_Igg_Out;
    }>;
}
