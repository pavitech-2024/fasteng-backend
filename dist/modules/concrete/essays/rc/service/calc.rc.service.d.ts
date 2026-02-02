import { Calc_CONCRETERC_Dto, Calc_CONCRETERC_Out } from '../dto/calc.rc.dto';
import { RC_step2Data } from '../schemas';
export declare class Calc_CONCRETERC_Service {
    private logger;
    constructor();
    calculateRc({ step2Data }: Calc_CONCRETERC_Dto): Promise<{
        success: boolean;
        result: Calc_CONCRETERC_Out;
    }>;
    calculateFinalResults(samples: RC_step2Data[], correctionFactors: number[]): number[];
    findToleranceRefs(samples: Calc_CONCRETERC_Dto['step2Data']): {
        higherReference: any[];
        lowerReference: any[];
    };
    findCorrectionFactorRefs(heightDiammeterRatio: number): {
        higherReference: any;
        lowerReference: any;
    };
    calculateTolerance(samples: any, refs: any): Array<{
        age: number;
        tolerance: number;
    }>;
    calculateCorrectionFactor(samples: any, correctionRefs: any): any[];
    verifyToleranceInput(samples: any, toleranceRatio: any): {
        success: boolean;
        error: string;
    };
}
