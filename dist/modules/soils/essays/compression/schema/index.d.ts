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
import { Sample } from '../../../../../modules/soils/samples/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_Compression_Out } from '../dto/calc.compression.dto';
export type CompressionDocument = HydratedDocument<Compression>;
export type CompressionGeneralData = {
    userId: string;
    name: string;
    sample: Sample;
    createdAt: Date;
    operator?: string;
    cauculist?: string;
    description?: string;
};
type hygroscopicData = {
    hygroscopicTable: hygTable[];
    moldNumber: number;
    moldVolume: number;
    moldWeight: number;
    socketWeight: number;
    spaceDiscThickness: number;
    strokesPerLayer: number;
    layers: number;
};
export type hygTable = {
    id: number;
    capsule: number;
    wetGrossWeightCapsule: number;
    dryGrossWeight: number;
    capsuleTare: number;
};
type humidityDeterminationData = {
    humidityTable: {
        id: number;
        capsules: number;
        wetGrossWeights: number;
        wetGrossWeightsCapsule: number;
        dryGrossWeightsCapsule: number;
        capsulesTare: number;
    }[];
};
export declare class Compression {
    _id: string;
    generalData: CompressionGeneralData;
    hygroscopicData: hygroscopicData;
    humidityDeterminationData: humidityDeterminationData;
    results: {
        data: Calc_Compression_Out;
    };
}
export declare const CompressionSchema: import("mongoose").Schema<Compression, import("mongoose").Model<Compression, any, any, any, import("mongoose").Document<unknown, any, Compression> & Compression & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Compression, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Compression>> & import("mongoose").FlatRecord<Compression> & Required<{
    _id: string;
}>>;
export {};
