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
import { Calc_SandEquivalent_Out } from "../dto/calc-sandEquivalent.dto";
export type SandEquivalentDocument = HydratedDocument<SandEquivalent>;
export type SandEquivalentGeneralData = {
    userId: string;
    name: string;
    material: Material;
};
type SandEquivalent_calc = {
    sandLevel: number;
    clayLevel: number;
};
export declare class SandEquivalent {
    _id: string;
    generalData: SandEquivalentGeneralData;
    sandEquivalent: SandEquivalent_calc;
    results: {
        data: Calc_SandEquivalent_Out;
    };
}
export declare const SandEquivalentSchema: import("mongoose").Schema<SandEquivalent, import("mongoose").Model<SandEquivalent, any, any, any, import("mongoose").Document<unknown, any, SandEquivalent> & SandEquivalent & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SandEquivalent, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SandEquivalent>> & import("mongoose").FlatRecord<SandEquivalent> & Required<{
    _id: string;
}>>;
export {};
