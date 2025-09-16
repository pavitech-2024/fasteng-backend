import { Calc_UnitMassDto } from "../dto/calc.sand-increase.dto";
export declare class Calc_UnitMass_Service {
    private logger;
    constructor();
    calculateUnitMass(body: Calc_UnitMassDto): Promise<{
        success: boolean;
        result: number[];
    }>;
}
