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
import { Material } from '../../../materials/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_CONCRETEGRANULOMETRY_Out } from '../dto/calc.granulometry.dto';
export type GranulometryDocument = HydratedDocument<Granulometry>;
export type GranulometryGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
type granulometry_step2Data = {
    material_mass: number;
    table_data: {
        sieve: string;
        passant: number;
        retained: number;
    }[];
    bottom: number;
};
export declare class Granulometry {
    _id: string;
    generalData: GranulometryGeneralData;
    step2Data: granulometry_step2Data;
    results: {
        data: Calc_CONCRETEGRANULOMETRY_Out;
    };
}
export declare const GranulometrySchema: import("mongoose").Schema<Granulometry, import("mongoose").Model<Granulometry, any, any, any, import("mongoose").Document<unknown, any, Granulometry> & Granulometry & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Granulometry, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Granulometry>> & import("mongoose").FlatRecord<Granulometry> & Required<{
    _id: string;
}>>;
export {};
