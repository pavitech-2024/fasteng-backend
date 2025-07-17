import { Rtfo } from "../schemas";
export declare class Calc_Rtfo_Dto {
    generalData: Rtfo['generalData'];
    rtfo: Rtfo['rtfo'];
}
export interface Calc_Rtfo_Out {
    list: {
        initialSetWeight: number;
        weightLoss: number;
    }[];
    weightLossAverage: number;
    alerts: string[];
}
