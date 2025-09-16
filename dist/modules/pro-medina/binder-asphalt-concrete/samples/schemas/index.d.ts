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
export type BinderAsphaltConcrete_SamplesDocument = HydratedDocument<BinderAsphaltConcrete_Sample>;
export type BinderAsphaltConcreteGeneralData = {
    name: string;
    zone: string;
    layer: string;
    highway: string;
    cityState: string;
    guideLineSpeed: string;
    observations?: string;
};
export type BinderAsphaltConcreteStep2Data = {
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
export type BinderAsphaltConcreteStep3Data = {
    refinery: string;
    company: string;
    collectionDate: string;
    invoiceNumber: string;
    dataInvoice: string;
    certificateDate: string;
    capType: string;
    performanceGrade: string;
    penetration: string;
    softeningPoint: string;
    elasticRecovery: string;
    vb_sp21_20: string;
    vb_sp21_50: string;
    vb_sp21_100: string;
    observations: string;
};
export type BinderAsphaltConcreteStep4Data = {
    granulometricRange: string;
    tmn: string;
    asphaltTenor: string;
    specificMass: string;
    volumeVoids: string;
    abrasionLA: string;
    rt: string;
    flowNumber: string;
    mr: string;
    fatigueCurve_n_cps: string;
    fatigueCurve_k1: string;
    fatigueCurve_k2: string;
    fatigueCurve_r2: string;
    observations: string;
};
export declare class BinderAsphaltConcrete_Sample {
    _id: string;
    generalData: BinderAsphaltConcreteGeneralData;
    step2Data: BinderAsphaltConcreteStep2Data;
    step3Data: BinderAsphaltConcreteStep3Data;
    step4Data: BinderAsphaltConcreteStep4Data;
}
export declare const BinderAsphaltConcrete_SampleSchema: import("mongoose").Schema<BinderAsphaltConcrete_Sample, import("mongoose").Model<BinderAsphaltConcrete_Sample, any, any, any, import("mongoose").Document<unknown, any, BinderAsphaltConcrete_Sample> & BinderAsphaltConcrete_Sample & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BinderAsphaltConcrete_Sample, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<BinderAsphaltConcrete_Sample>> & import("mongoose").FlatRecord<BinderAsphaltConcrete_Sample> & Required<{
    _id: string;
}>>;
