import { HydratedDocument } from 'mongoose';
export type SampleDocument = HydratedDocument<Sample>;
export declare class Sample {
    _id: string;
    name: string;
    type: 'inorganicSoil' | 'organicSoil' | 'pavimentLayer';
    userId: string;
    description: {
        construction?: string;
        provenance?: string;
        snippet?: string;
        stake?: string;
        exd?: string;
        depth?: string;
        layer?: string;
        collectionDate?: Date;
        observation?: string;
    };
}
export declare const SampleSchema: import("mongoose").Schema<Sample, import("mongoose").Model<Sample, any, any, any, import("mongoose").Document<unknown, any, Sample> & Sample & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sample, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Sample>> & import("mongoose").FlatRecord<Sample> & Required<{
    _id: string;
}>>;
