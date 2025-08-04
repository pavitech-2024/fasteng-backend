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
import { HydratedDocument } from 'mongoose';
import { Material } from '../../../materials/schemas';
import { Calc_ANGULARITY_Out } from '../dto/calc.angularity.dto';
export type AngularityDocument = HydratedDocument<Angularity>;
export type AngularityGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
export type row_step2 = {
    diameter?: string;
    determination: string;
    cylinder_mass: number;
    cylinder_mass_plus_sample: number;
};
type Angularity_step2Data = {
    relative_density: number;
    cylinder_volume: number;
    method: 'A' | 'B' | 'C';
    determinations: row_step2[];
};
export declare class Angularity {
    _id: string;
    generalData: AngularityGeneralData;
    step2Data: Angularity_step2Data;
    results: {
        data: Calc_ANGULARITY_Out;
    };
}
export declare const AngularitySchema: import("mongoose").Schema<Angularity, import("mongoose").Model<Angularity, any, any, any, import("mongoose").Document<unknown, any, Angularity> & Angularity & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Angularity, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Angularity>> & import("mongoose").FlatRecord<Angularity> & Required<{
    _id: string;
}>>;
export {};
