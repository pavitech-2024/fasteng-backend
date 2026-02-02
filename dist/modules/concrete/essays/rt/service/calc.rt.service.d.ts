import { Calc_Concrete_RT_Dto } from '../dto/calc.rt.dto';
export declare class Calc_ConcreteRt_Service {
    private logger;
    calculateConcreteRt({ step2Data, }: Calc_Concrete_RT_Dto): Promise<{
        success: boolean;
        result: any;
    }>;
    findToleranceRefs(samples: Calc_Concrete_RT_Dto['step2Data']): {
        higherReference: any[];
        lowerReference: any[];
    };
    calculateTolerance(samples: any, refs: any): any[];
    verifyToleranceInput(samples: any, toleranceRatio: any): {
        success: boolean;
        error: string;
    };
    calculateFlexualTensileStrength(appliedCharge: number, supportsDistance: number): number;
    calculateCompressionResistance(appliedCharge: number): number;
}
