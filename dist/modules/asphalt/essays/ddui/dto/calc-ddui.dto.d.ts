import { Ddui } from "../schemas";
export declare class Calc_Ddui_Dto {
    generalData: Ddui['generalData'];
    dduiStep2: Ddui['dduiStep2'];
    dduiStep3: Ddui['dduiStep3'];
}
export interface Calc_Ddui_Out {
    everyRtsMpa: any[];
    everyRtsKgf: any[];
    conditionedAverage: number;
    unconditionedAverage: number;
    rrt: number;
}
