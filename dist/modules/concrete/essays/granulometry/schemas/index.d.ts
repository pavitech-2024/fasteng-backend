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
