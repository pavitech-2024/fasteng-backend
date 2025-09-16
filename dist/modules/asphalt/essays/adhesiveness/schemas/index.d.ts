/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
