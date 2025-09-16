import { SayboltFurol } from "../schemas";
export declare class Calc_SayboltFurol_Dto {
    generalData: SayboltFurol['generalData'];
    sayboltFurol: SayboltFurol['sayboltFurol'];
}
export interface Calc_SayboltFurol_Out {
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
