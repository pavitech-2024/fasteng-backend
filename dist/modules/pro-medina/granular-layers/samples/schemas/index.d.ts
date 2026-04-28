import { HydratedDocument } from 'mongoose';
export type GranularLayers_SamplesDocument = HydratedDocument<GranularLayers_Sample>;
export type GranularLayersGeneralData = {
    name: string;
    tipoSecao: string;
    faseMonitoramento: string;
    liberacaoTrafico: string;
    utilizadaMedina: string;
    utilizadaLvec: string;
    dadosConfirmadosICT: string;
    observation: string;
    iriPrerehabilitation: string;
    atPrerehabilitation: string;
    fresagem: string;
    millingThickness: string;
    interventionAtTheBase: string;
    sami: string;
    bondingPaint: string;
    priming: string;
    lastUpdate: string;
    serviceTimeYears: string;
    serviceTimeMonths: string;
    roadName: string;
    cityState: string;
    experimentalLength: string;
    guideSpeed: string;
    kmInicial: string;
    kmFinal: string;
    inicioEstaca: string;
    inicioMetros: string;
    fimEstaca: string;
    fimMetros: string;
    averageAltitude: string;
    numberOfTracks: string;
    monitoredTrack: string;
    trackWidth: string;
    structuralComposition: {
        id: number;
        layer: string;
        material: string;
        thickness: string;
    }[];
    images: string;
    imagesDate: string;
};
export type GranularLayersStep2Data = {
    layers: {
        id: string;
        name: string;
        mctCoefficientC: string;
        mctIndexE: string;
        especificMass: string;
        optimalHumidity: string;
        compressionEnergy: string;
        k1: string;
        k2: string;
        k3: string;
        k4: string;
        k1psi1: string;
        k2psi2: string;
        k3psi3: string;
        k4psi4: string;
    }[];
    observations: string;
};
export declare class GranularLayers_Sample {
    _id: string;
    generalData: GranularLayersGeneralData;
    step2Data: GranularLayersStep2Data;
}
export declare const GranularLayers_SampleSchema: import("mongoose").Schema<GranularLayers_Sample, import("mongoose").Model<GranularLayers_Sample, any, any, any, import("mongoose").Document<unknown, any, GranularLayers_Sample> & GranularLayers_Sample & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GranularLayers_Sample, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<GranularLayers_Sample>> & import("mongoose").FlatRecord<GranularLayers_Sample> & Required<{
    _id: string;
}>>;
