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
import { Calc_AsphaltGranulometry_Out } from "../dto/asphalt.calc.granulometry.dto";
export type AsphaltGranulometryDocument = HydratedDocument<AsphaltGranulometry>;
export type AsphaltGranulometryGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
type AsphaltGranulometry_step2Data = {
    material_mass: number;
    table_data: {
        sieve_label: string;
        sieve_value: number;
        passant: number;
        retained: number;
    }[];
    bottom: number;
};
export declare class AsphaltGranulometry {
    _id: string;
    generalData: AsphaltGranulometryGeneralData;
    step2Data: AsphaltGranulometry_step2Data;
    results: Calc_AsphaltGranulometry_Out;
}
export declare const AsphaltGranulometrySchema: import("mongoose").Schema<AsphaltGranulometry, import("mongoose").Model<AsphaltGranulometry, any, any, any, import("mongoose").Document<unknown, any, AsphaltGranulometry> & AsphaltGranulometry & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AsphaltGranulometry, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AsphaltGranulometry>> & import("mongoose").FlatRecord<AsphaltGranulometry> & Required<{
    _id: string;
}>>;
export {};
