import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_SofteningPoint_Out } from "../dto/calc-softeningPoint.dto";
export type SofteningPointDocument = HydratedDocument<SofteningPoint>;
export type SofteningPointGeneralData = {
    userId: string;
    name: string;
    material: Material;
};
type SofteningPoint_calc = {
    temperature1: number;
    temperature2: number;
};
export declare class SofteningPoint {
    _id: string;
    generalData: SofteningPointGeneralData;
    softeningPoint: SofteningPoint_calc;
    results: {
        data: Calc_SofteningPoint_Out;
    };
}
export declare const SofteningPointSchema: import("mongoose").Schema<SofteningPoint, import("mongoose").Model<SofteningPoint, any, any, any, import("mongoose").Document<unknown, any, SofteningPoint> & SofteningPoint & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SofteningPoint, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SofteningPoint>> & import("mongoose").FlatRecord<SofteningPoint> & Required<{
    _id: string;
}>>;
export {};
