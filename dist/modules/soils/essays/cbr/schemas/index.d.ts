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
import { Calc_CBR_Out } from '../dto/calc.cbr.dto';
export type CbrDocument = HydratedDocument<Cbr>;
export type CbrGeneralData = {
    userId: string;
    name: string;
    sample: Sample;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
type cbr_step2Data = {
    ring_constant: number;
    cylinder_height: number;
    extended_reads: [
        {
            minimum_read: '0.5';
            pol: '0.025';
            mm: '0.63';
            extended_read: number;
        },
        {
            minimum_read: '1';
            pol: '0.05';
            mm: '1.27';
            extended_read: number;
        },
        {
            minimum_read: '1.5';
            pol: '0.075';
            mm: '1.90';
            extended_read: number;
        },
        {
            minimum_read: '2';
            pol: '0.1';
            mm: '2.54';
            extended_read: number;
        },
        {
            minimum_read: '3';
            pol: '0.15';
            mm: '3.81';
            extended_read: number;
        },
        {
            minimum_read: '4';
            pol: '0.2';
            mm: '5.08';
            extended_read: number;
        },
        {
            minimum_read: '6';
            pol: '0.3';
            mm: '7.62';
            extended_read: number;
        },
        {
            minimum_read: '8';
            pol: '0.4';
            mm: '10.16';
            extended_read: number;
        },
        {
            minimum_read: '10';
            pol: '0.5';
            mm: '12.7';
            extended_read: number;
        }
    ];
};
type cbr_expansionData = {
    id: number;
    date: Date;
    time: Date;
    deflectometer_read: number;
}[];
export declare class Cbr {
    _id: string;
    generalData: CbrGeneralData;
    step2Data: cbr_step2Data;
    expansionData: cbr_expansionData;
    results: {
        data: Calc_CBR_Out;
    };
}
export declare const CbrSchema: import("mongoose").Schema<Cbr, import("mongoose").Model<Cbr, any, any, any, import("mongoose").Document<unknown, any, Cbr> & Cbr & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cbr, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Cbr>> & import("mongoose").FlatRecord<Cbr> & Required<{
    _id: string;
}>>;
export {};
