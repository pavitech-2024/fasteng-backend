import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";

export type ABCPDocument = HydratedDocument<ABCP>;

export type ABCPGeneralData = {
    userId: string;
    name: string;
}

export type ABCPMaterialSelectionData = {
    coarseAggregate: string;
    fineAggregate: string;
    cement: string;
}

export type ABCPEssaySelectionData = {
    fineAggregate: {
        _id: string;
        specificMass: number;
        granulometry_id: string;
        };
    coarseAggregate: {
        _id: string;
        granulometry_id: string;
        specificMass: number;
        unitMass_id: string
    };
    cement: {
        _id: string;
        specificMass: number;
    };
}

export type ABCPInsertParamsData = {
    condition: number;
    fck: number;
    reduction: number;
}

export type ABCPResults = {
    fcj: number;
    ac: number;
    ca: number; //  L/m³
    cc: number;
    cb: number;
    careia: number;
    //Graph
    Xvalues: number[];
    Yvalues: number[];
    formula: string;
    resistanceCurve: string;
}

@Schema({ collection: 'abcps' })
export class ABCP {
    _id: string;

    @IsNotEmpty()
    @Prop({ type: Object })
    generalData: ABCPGeneralData;

    @IsNotEmpty()
    @Prop({ type: Object })
    materialSelectionData: ABCPMaterialSelectionData

    @IsNotEmpty()
    @Prop({ type: Object })
    essaySelectionData: ABCPEssaySelectionData

    @IsNotEmpty()
    @Prop({ type: Object })
    insertParamsData: ABCPInsertParamsData

    @IsNotEmpty()
    @Prop({ type: Object })
    results: ABCPResults
}

export const ABCPSchema = SchemaFactory.createForClass(ABCP);