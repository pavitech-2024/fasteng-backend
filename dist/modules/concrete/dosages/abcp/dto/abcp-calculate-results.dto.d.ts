import { ABCP } from "../schemas";
export declare class Calc_ABCP_Dto {
    generalData: ABCP['generalData'];
    materialSelectionData: ABCP['materialSelectionData'];
    essaySelectionData: ABCP['essaySelectionData'];
    insertParamsData: ABCP['insertParamsData'];
}
export interface Calc_ABCP_Out {
    fcj: number;
    ac: number;
    ca: number;
    cc: number;
    cb: number;
    careia: number;
    Xvalues: number[];
    Yvalues: number[];
    formula: string;
    resistanceCurve: string;
}
export declare class SaveAbcpDto {
    generalData: ABCP['generalData'];
    materialSelectionData: ABCP['materialSelectionData'];
    essaySelectionData: ABCP['essaySelectionData'];
    insertParamsData: ABCP['insertParamsData'];
    results: Calc_ABCP_Out;
}
