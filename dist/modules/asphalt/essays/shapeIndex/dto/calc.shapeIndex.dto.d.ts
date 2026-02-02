import { ShapeIndex } from '../schemas';
export declare class Calc_SHAPEINDEX_Dto {
    generalData: ShapeIndex['generalData'];
    step2Data: ShapeIndex['step2Data'];
}
export interface Calc_SHAPEINDEX_Out {
    shape_index: number;
    alerts: string[];
}
