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
