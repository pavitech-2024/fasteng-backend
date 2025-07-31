import { FwdRepository } from '../repository';
import { Calc_Fwd_Dto, Calc_Fwd_Out } from '../dto/calc-fwd.dto';
export declare class Calc_Fwd_Service {
    private readonly fwdRepository;
    private logger;
    constructor(fwdRepository: FwdRepository);
    calculateFwd({ fwdStep3 }: Calc_Fwd_Dto): Promise<{
        success: boolean;
        result: Calc_Fwd_Out;
    }>;
}
