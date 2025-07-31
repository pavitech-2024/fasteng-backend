import { HydratedDocument } from 'mongoose';
import { Material } from '../../../materials/schemas';
import { Calc_DUCTILITY_Out } from '../dto/calc.ductility.dto';
export type DuctilityDocument = HydratedDocument<Ductility>;
export type DuctilityGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
type Ductility_step2Data = {
    first_rupture_length: number;
    second_rupture_length: number;
    third_rupture_length: number;
};
export declare class Ductility {
    _id: string;
    generalData: DuctilityGeneralData;
    step2Data: Ductility_step2Data;
    results: {
        data: Calc_DUCTILITY_Out;
    };
}
export declare const DuctilitySchema: import("mongoose").Schema<Ductility, import("mongoose").Model<Ductility, any, any, any, import("mongoose").Document<unknown, any, Ductility> & Ductility & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Ductility, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Ductility>> & import("mongoose").FlatRecord<Ductility> & Required<{
    _id: string;
}>>;
export {};
