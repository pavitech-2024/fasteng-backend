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
import { Date, HydratedDocument } from "mongoose";
import { Calc_Penetration_Out } from "../dto/calc.penetration.dto";
import { Material } from "../../../../../modules/asphalt/materials/schemas";
export type PenetrationDocument = HydratedDocument<Penetration>;
export type PenetrationGeneralData = {
    name: string;
    material: Material;
    userId: string;
};
type penetration_Calc = {
    resultMode: boolean;
    experimentDate: Date;
    points: number[];
};
export declare class Penetration {
    _id: string;
    generalData: PenetrationGeneralData;
    penetrationCalc: penetration_Calc;
    results: {
        data: Calc_Penetration_Out;
    };
}
export declare const PenetrationSchema: import("mongoose").Schema<Penetration, import("mongoose").Model<Penetration, any, any, any, import("mongoose").Document<unknown, any, Penetration> & Penetration & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Penetration, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Penetration>> & import("mongoose").FlatRecord<Penetration> & Required<{
    _id: string;
}>>;
export {};
