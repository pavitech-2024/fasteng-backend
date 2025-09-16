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
import { Sample } from '../../../samples/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_HRB_Out } from '../dto/calc.hrb.dto';
export type HrbGeneralData = {
    userId: string;
    name: string;
    sample: Sample;
    createdAt: Date;
    operator?: string;
    cauculist?: string;
    description?: string;
};
type HRB_step2Data = {
    tableData: {
        sieve: number;
        percent_passant: number;
    }[];
    liquidity_limit: number;
    plasticity_limit: number;
};
export type HrbDocument = HydratedDocument<Hrb>;
export declare class Hrb {
    _id: string;
    generalData: HrbGeneralData;
    step2Data: HRB_step2Data;
    results: {
        data: Calc_HRB_Out;
    };
}
export declare const HrbSchema: import("mongoose").Schema<Hrb, import("mongoose").Model<Hrb, any, any, any, import("mongoose").Document<unknown, any, Hrb> & Hrb & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Hrb, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Hrb>> & import("mongoose").FlatRecord<Hrb> & Required<{
    _id: string;
}>>;
export {};
