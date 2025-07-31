import { Result_UnitMass_Dto } from '../dto/unitMass-result.dto';
export declare class Result_UnitMass_Service {
    calculateUnitMass({ step2Data }: Result_UnitMass_Dto): Promise<{
        success: boolean;
        result: {
            result: number;
        };
    }>;
}
