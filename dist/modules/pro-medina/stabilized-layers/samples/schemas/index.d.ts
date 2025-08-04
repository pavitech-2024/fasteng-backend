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
export type StabilizedLayers_SamplesDocument = HydratedDocument<StabilizedLayers_Sample>;
export type StabilizedLayersGeneralData = {
    name: string;
    zone: string;
    layer: string;
    highway: string;
    cityState: string;
    guideLineSpeed: string;
    observations?: string;
};
export type StabilizedLayersStep2Data = {
    identification: string;
    sectionType: string;
    extension: string;
    initialStakeMeters: string;
    latitudeI: string;
    longitudeI: string;
    finalStakeMeters: string;
    latitudeF: string;
    longitudeF: string;
    monitoringPhase: string;
    trafficLiberation: string;
    averageAltitude: string;
    numberOfTracks: string;
    monitoredTrack: string;
    trackWidth: string;
    observation: string;
    milling: string;
    interventionAtTheBase: string;
    sami: string;
    bondingPaint: string;
    priming: string;
    images: string[];
    structuralComposition: {
        id: number;
        layer: unknown;
        material: unknown;
        thickness: unknown;
    }[];
};
export type StabilizedLayersStep3Data = {
    stabilizer: string;
    tenor: string;
    especificMass: string;
    compressionEnergy: string;
    rtcd: string;
    rtf: string;
    rcs: string;
    granulometricRange: string;
    optimalHumidity: string;
    rsInitial: string;
    rsFinal: string;
    constantA: string;
    constantB: string;
    k1psi1: string;
    k2psi2: string;
    observations: string;
};
export declare class StabilizedLayers_Sample {
    _id: string;
    generalData: StabilizedLayersGeneralData;
    step2Data: StabilizedLayersStep2Data;
    step3Data: StabilizedLayersStep3Data;
}
export declare const StabilizedLayers_SampleSchema: import("mongoose").Schema<StabilizedLayers_Sample, import("mongoose").Model<StabilizedLayers_Sample, any, any, any, import("mongoose").Document<unknown, any, StabilizedLayers_Sample> & StabilizedLayers_Sample & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StabilizedLayers_Sample, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<StabilizedLayers_Sample>> & import("mongoose").FlatRecord<StabilizedLayers_Sample> & Required<{
    _id: string;
}>>;
