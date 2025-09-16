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
import { Calc_Rtcd_Out } from '../dto/calc-rtcd.dto';
export type RtcdDocument = HydratedDocument<Rtcd>;
export type RtcdGeneralData = {
    userId: string;
    name: string;
};
export type Rtcd_Step2 = {
    dnitRange: string;
    sampleVoidVolume: number;
    pressConstant: number;
    pressSpecification: string;
    sampleOrigin: string;
};
type Rtcd_Step3 = {
    data: {
        sampleName: string;
        d1: number;
        d2: number;
        d3: number;
        h1: number;
        h2: number;
        h3: number;
        pressReading: number;
    }[];
};
export declare class Rtcd {
    _id: string;
    generalData: RtcdGeneralData;
    rtcdStep2: Rtcd_Step2;
    rtcdStep3: Rtcd_Step3;
    results: {
        data: Calc_Rtcd_Out;
    };
}
export declare const RtcdSchema: import("mongoose").Schema<Rtcd, import("mongoose").Model<Rtcd, any, any, any, import("mongoose").Document<unknown, any, Rtcd> & Rtcd & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Rtcd, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Rtcd>> & import("mongoose").FlatRecord<Rtcd> & Required<{
    _id: string;
}>>;
export {};
