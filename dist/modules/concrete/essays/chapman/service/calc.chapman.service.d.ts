import { Calc_CHAPMAN_dto } from '../dto/calc.chapman.dto';
export declare class Calc_CHAPMAN_Service {
    private logger;
    calculateChapman({ step2Data }: Calc_CHAPMAN_dto): Promise<{
        success: boolean;
        result: {
            m_e: number;
        };
    }>;
}
