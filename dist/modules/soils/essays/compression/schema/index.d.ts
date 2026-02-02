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
