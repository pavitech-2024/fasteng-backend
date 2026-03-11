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
