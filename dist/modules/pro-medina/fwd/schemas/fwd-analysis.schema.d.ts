import { Document } from 'mongoose';
export type FwdAnalysisDocument = FwdAnalysis & Document;
export declare class FwdAnalysis {
    name: string;
    description: string;
    samples: any[];
    status: string;
    userId?: string;
}
export declare const FwdAnalysisSchema: import("mongoose").Schema<FwdAnalysis, import("mongoose").Model<FwdAnalysis, any, any, any, Document<unknown, any, FwdAnalysis> & FwdAnalysis & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FwdAnalysis, Document<unknown, {}, import("mongoose").FlatRecord<FwdAnalysis>> & import("mongoose").FlatRecord<FwdAnalysis> & {
    _id: import("mongoose").Types.ObjectId;
}>;
