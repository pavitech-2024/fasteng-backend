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
