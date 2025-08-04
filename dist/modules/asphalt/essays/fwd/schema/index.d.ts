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
import { Calc_Fwd_Out } from '../dto/calc-fwd.dto';
export type FwdDocument = HydratedDocument<Fwd>;
export type FwdGeneralData = {
    userId: string;
    name: string;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
export type Fwd_step2 = {
    work: string;
    section: number;
    initialStake: number;
    initialSide: string;
    finalStake: number;
    finalSide: string;
};
export type Fwd_step3 = {
    spreadsheetData: {
        hodometro: number;
        force: number;
        d1: number;
        d2: number;
        d3: number;
        d4: number;
        d5: number;
        d6: number;
        d7: number;
        d8: number;
        d9: number;
        d10: number;
        d11: number;
        d12: number;
        d13: number;
    }[];
};
export type Results = {
    results: {
        data: Calc_Fwd_Out;
    };
};
export declare class Fwd {
    _id: string;
    generalData: FwdGeneralData;
    fwdStep2: Fwd_step2;
    fwdStep3: Fwd_step3;
    results: {
        data: Calc_Fwd_Out;
    };
}
export declare const FwdSchema: import("mongoose").Schema<Fwd, import("mongoose").Model<Fwd, any, any, any, import("mongoose").Document<unknown, any, Fwd> & Fwd & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Fwd, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Fwd>> & import("mongoose").FlatRecord<Fwd> & Required<{
    _id: string;
}>>;
