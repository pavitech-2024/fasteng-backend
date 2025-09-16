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
import { Material } from "../../../materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_CoarseAggregateSpecificMass_Out } from "../dto/calc.coarseAggregateSpecificMass.dto";
export type CoarseAggregateSpecificMassDocument = HydratedDocument<CoarseAggregateSpecificMass>;
export type CoarseAggregateSpecificMassGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
type coarseAggregateSpecificMass_step2Data = {
    material_mass: number;
    table_data: {
        sieve: string;
        passant: number;
        retained: number;
    }[];
    bottom: number;
};
export declare class CoarseAggregateSpecificMass {
    _id: string;
    generalData: CoarseAggregateSpecificMassGeneralData;
    step2Data: coarseAggregateSpecificMass_step2Data;
    results: {
        data: Calc_CoarseAggregateSpecificMass_Out;
    };
}
export declare const CoarseAggregateSpecificMassSchema: import("mongoose").Schema<CoarseAggregateSpecificMass, import("mongoose").Model<CoarseAggregateSpecificMass, any, any, any, import("mongoose").Document<unknown, any, CoarseAggregateSpecificMass> & CoarseAggregateSpecificMass & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CoarseAggregateSpecificMass, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CoarseAggregateSpecificMass>> & import("mongoose").FlatRecord<CoarseAggregateSpecificMass> & Required<{
    _id: string;
}>>;
export {};
