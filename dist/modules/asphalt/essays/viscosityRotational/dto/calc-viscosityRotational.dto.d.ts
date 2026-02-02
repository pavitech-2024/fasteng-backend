import { ViscosityRotational } from '../schemas';
export declare class Calc_ViscosityRotational_Dto {
    generalData: ViscosityRotational['generalData'];
    viscosityRotational: ViscosityRotational['viscosityRotational'];
}
export interface Calc_ViscosityRotational_Out {
    graph: string;
    machiningTemperatureRange: {
        higher: number;
        lower: number;
        average: number;
    };
    compressionTemperatureRange: {
        higher: number;
        lower: number;
        average: number;
    };
    aggregateTemperatureRange: {
        higher: number;
        lower: number;
        average: number;
    };
    curvePoints: number[][];
    equation: {
        aIndex: number;
        bIndex: number;
    };
}
