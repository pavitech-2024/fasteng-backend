export declare class Calc_ViscosityRotational_Dto {
    generalData: Record<string, any>;
    viscosityRotational: Record<string, any>;
}
export declare class Calc_ViscosityRotational_Out {
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
