import { AsphaltGranulometry } from "../schemas";
export declare class Calc_AsphaltGranulometry_Dto {
    generalData: AsphaltGranulometry['generalData'];
    step2Data: AsphaltGranulometry['step2Data'];
    isSuperpave?: boolean;
}
export declare class Calc_AsphaltGranulometry_Out {
    accumulated_retained: [string, number][];
    graph_data: [number, number][];
    passant: [string, number][];
    retained_porcentage: [string, number][];
    passant_porcentage: [string, number][];
    total_retained: number;
    nominal_diameter: number;
    nominal_size: number;
    fineness_module: number;
    cc: number;
    cnu: number;
    error: number;
}
