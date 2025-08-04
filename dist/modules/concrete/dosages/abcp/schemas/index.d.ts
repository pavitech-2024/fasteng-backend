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
import { HydratedDocument } from "mongoose";
export type ABCPDocument = HydratedDocument<ABCP>;
export type ABCPGeneralData = {
    userId: string;
    name: string;
    step: number;
};
export type ABCPMaterialObject = {
    id: string;
    type: string;
};
export type ABCPMaterialSelectionData = {
    name: string;
    coarseAggregate: ABCPMaterialObject;
    fineAggregate: ABCPMaterialObject;
    cement: ABCPMaterialObject;
};
export type ABCPEssaySelectionData = {
    name: string;
    fineAggregate: {
        _id: {
            id: string;
            type: string;
        };
        specificMass: number;
        granulometry_id: string;
    };
    coarseAggregate: {
        _id: {
            id: string;
            type: string;
        };
        granulometry_id: string;
        specificMass: number;
        unitMass_id: string;
    };
    cement: {
        _id: string;
        specificMass: number;
    };
};
export type ABCPInsertParamsData = {
    name: string;
    condition: number;
    fck: number;
    reduction: number;
};
export type ABCPResults = {
    fcj: number;
    ac: number;
    ca: number;
    cc: number;
    cb: number;
    careia: number;
    Xvalues: number[];
    Yvalues: number[];
    formula: string;
    resistanceCurve: string;
};
export declare class ABCP {
    _id: string;
    generalData: ABCPGeneralData;
    materialSelectionData: ABCPMaterialSelectionData;
    essaySelectionData: ABCPEssaySelectionData;
    insertParamsData: ABCPInsertParamsData;
    results: ABCPResults;
}
declare const ABCPSchema: import("mongoose").Schema<ABCP, import("mongoose").Model<ABCP, any, any, any, import("mongoose").Document<unknown, any, ABCP> & ABCP & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ABCP, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ABCP>> & import("mongoose").FlatRecord<ABCP> & Required<{
    _id: string;
}>>;
export { ABCPSchema };
