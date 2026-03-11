import { HydratedDocument } from 'mongoose';
export type GranularLayers_SamplesDocument = HydratedDocument<GranularLayers_Sample>;
export type GranularLayersGeneralData = {
    name: string;
    zone: string;
    layer: string;
    cityState: string;
    highway: string;
    guideLineSpeed: string;
    observations?: string;
};
export type GranularLayersStep2Data = {
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
export type GranularLayersStep3Data = {
    mctGroup: string;
    mctCoefficientC: string;
    mctIndexE: string;
    especificMass: string;
    compressionEnergy: string;
    granulometricRange: string;
    optimalHumidity: string;
    abrasionLA: string;
    k1: string;
    k2: string;
    k3: string;
    k4: string;
    k1psi1: string;
    k2psi2: string;
    k3psi3: string;
    k4psi4: string;
    observations: string;
};
export declare class GranularLayers_Sample {
    _id: string;
    generalData: GranularLayersGeneralData;
    step2Data: GranularLayersStep2Data;
    step3Data: GranularLayersStep3Data;
}
export declare const GranularLayers_SampleSchema: import("mongoose").Schema<GranularLayers_Sample, import("mongoose").Model<GranularLayers_Sample, any, any, any, import("mongoose").Document<unknown, any, GranularLayers_Sample> & GranularLayers_Sample & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GranularLayers_Sample, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<GranularLayers_Sample>> & import("mongoose").FlatRecord<GranularLayers_Sample> & Required<{
    _id: string;
}>>;
