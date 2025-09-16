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
import { Calc_Rtfo_Out } from "../dto/calc-rtfo.dto";
export type RtfoDocument = HydratedDocument<Rtfo>;
export type RtfoGeneralData = {
    userId: string;
    name: string;
    material: Material;
};
type RtfoSamples = {
    sampleWeight: number;
    finalSampleWeight: number;
};
type Rtfo_calc = {
    list: RtfoSamples[];
};
export declare class Rtfo {
    _id: string;
    generalData: RtfoGeneralData;
    rtfo: Rtfo_calc;
    results: {
        data: Calc_Rtfo_Out;
    };
}
export declare const RtfoSchema: import("mongoose").Schema<Rtfo, import("mongoose").Model<Rtfo, any, any, any, import("mongoose").Document<unknown, any, Rtfo> & Rtfo & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Rtfo, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Rtfo>> & import("mongoose").FlatRecord<Rtfo> & Required<{
    _id: string;
}>>;
export {};
