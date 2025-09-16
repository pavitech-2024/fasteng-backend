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
import { Calc_SHAPEINDEX_Out } from '../dto/calc.shapeIndex.dto';
export type ShapeIndexDocument = HydratedDocument<ShapeIndex>;
export type ShapeIndexGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
export type ShapeIndexCircularSieveRow = {
    label: string;
    sieve1: number;
    sieve2: number;
};
export type ShapeIndexSieveRow = {
    label: string;
    retained_mass: number;
    grains_count: number;
};
export type ShapeIndexReadRow = {
    id: number;
    sieve: string;
    length: number;
    thickness: number;
};
type ShapeIndex_step2Data = {
    method: 'sieve' | 'pachymeter';
    total_mass: number;
    graduation: 'A' | 'B' | 'C' | 'D';
    circular_sieves_table_data: ShapeIndexCircularSieveRow[];
    sieves_table_data: ShapeIndexSieveRow[];
    reads_table_data: ShapeIndexReadRow[];
};
export declare class ShapeIndex {
    _id: string;
    generalData: ShapeIndexGeneralData;
    step2Data: ShapeIndex_step2Data;
    results: {
        data: Calc_SHAPEINDEX_Out;
    };
}
export declare const ShapeIndexSchema: import("mongoose").Schema<ShapeIndex, import("mongoose").Model<ShapeIndex, any, any, any, import("mongoose").Document<unknown, any, ShapeIndex> & ShapeIndex & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ShapeIndex, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ShapeIndex>> & import("mongoose").FlatRecord<ShapeIndex> & Required<{
    _id: string;
}>>;
export {};
