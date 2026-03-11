import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_Adhesiveness_Out } from "../dto/calc.adhesiveness.dto";
export type AdhesivenessDocument = HydratedDocument<Adhesiveness>;
export type AdhesivenessGeneralData = {
    userId: string;
    name: string;
    material: Material;
};
type Adhesiveness_calc = {
    filmDisplacement: boolean;
    binder: Material;
};
export declare class Adhesiveness {
    _id: string;
    generalData: AdhesivenessGeneralData;
    adhesiveness: Adhesiveness_calc;
    results: {
        data: Calc_Adhesiveness_Out;
    };
}
export declare const AdhesivenessSchema: import("mongoose").Schema<Adhesiveness, import("mongoose").Model<Adhesiveness, any, any, any, import("mongoose").Document<unknown, any, Adhesiveness> & Adhesiveness & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Adhesiveness, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Adhesiveness>> & import("mongoose").FlatRecord<Adhesiveness> & Required<{
    _id: string;
}>>;
export {};
