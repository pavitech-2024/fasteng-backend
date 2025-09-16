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
import { Sample } from '../../../samples/schemas';
import { Calc_SUCS_Out } from '../dto/calc.sucs.dto';
export type SucsDocument = HydratedDocument<Sucs>;
export type SucsGeneralData = {
    userId: string;
    name: string;
    sample: Sample;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
type sucs_step2Data = {
    cc: number;
    cnu: number;
    liquidity_limit: number;
    plasticity_limit: number;
    sieves: {
        sieve: string;
        passant: number;
    }[];
    organic_matter: boolean;
};
export declare class Sucs {
    _id: string;
    generalData: SucsGeneralData;
    step2Data: sucs_step2Data;
    results: {
        data: Calc_SUCS_Out;
    };
}
export declare const SucsSchema: import("mongoose").Schema<Sucs, import("mongoose").Model<Sucs, any, any, any, import("mongoose").Document<unknown, any, Sucs> & Sucs & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sucs, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Sucs>> & import("mongoose").FlatRecord<Sucs> & Required<{
    _id: string;
}>>;
export {};
