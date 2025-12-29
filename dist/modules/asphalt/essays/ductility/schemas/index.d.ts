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
