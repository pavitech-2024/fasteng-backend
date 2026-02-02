import { CoarseAggregateSpecificMass } from "../schemas";
export declare class Calc_CoarseAggregateSpecificMass_Dto {
    generalData: CoarseAggregateSpecificMass['generalData'];
    step2Data: CoarseAggregateSpecificMass['step2Data'];
}
export interface Calc_CoarseAggregateSpecificMass_Out {
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
