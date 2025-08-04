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
import { Material } from '../../../../../modules/asphalt/materials/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_ViscosityRotational_Out } from '../dto/calc-viscosityRotational.dto';
export type ViscosityRotationalDocument = HydratedDocument<ViscosityRotational>;
export type ViscosityRotationalGeneralData = {
    userId: string;
    name: string;
    material: Material;
};
type ViscosityRotational_calc = {
    viscosityType: string;
    dataPoints: {
        id: number;
        temperature: number;
        viscosity: number;
    }[];
};
export declare class ViscosityRotational {
    _id: string;
    generalData: ViscosityRotationalGeneralData;
    viscosityRotational: ViscosityRotational_calc;
    results: {
        data: Calc_ViscosityRotational_Out;
    };
}
export declare const ViscosityRotationalSchema: import("mongoose").Schema<ViscosityRotational, import("mongoose").Model<ViscosityRotational, any, any, any, import("mongoose").Document<unknown, any, ViscosityRotational> & ViscosityRotational & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ViscosityRotational, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ViscosityRotational>> & import("mongoose").FlatRecord<ViscosityRotational> & Required<{
    _id: string;
}>>;
export {};
