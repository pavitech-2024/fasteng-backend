export declare class Calc_CONCRETEGRANULOMETRY_Dto {
    generalData: Record<string, any>;
    step2Data: Record<string, any>;
}
export interface Calc_CONCRETEGRANULOMETRY_Out {
    accumulated_retained: number[];
    graph_data: [number, number][];
    passant: number[];
    retained_porcentage: number[];
    total_retained: number;
    nominal_diameter: number;
    nominal_size: number;
    fineness_module: number;
    cc: number;
    cnu: number;
    error: number;
}
