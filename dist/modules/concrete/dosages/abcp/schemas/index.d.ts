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
