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
import { Calc_Abrasion_Out } from "../dto/calc-abrasion.dto";
export type AbrasionDocument = HydratedDocument<Abrasion>;
export type AbrasionGeneralData = {
    name: string;
    material: Material;
    userId: string;
};
type abrasion_Calc = {
    initialMass: number;
    finalMass: number;
    graduation: string;
};
export declare class Abrasion {
    _id: string;
    generalData: AbrasionGeneralData;
    abrasionCalc: abrasion_Calc;
    results: {
        data: Calc_Abrasion_Out;
    };
}
export declare const AbrasionSchema: import("mongoose").Schema<Abrasion, import("mongoose").Model<Abrasion, any, any, any, import("mongoose").Document<unknown, any, Abrasion> & Abrasion & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Abrasion, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Abrasion>> & import("mongoose").FlatRecord<Abrasion> & Required<{
    _id: string;
}>>;
export {};
