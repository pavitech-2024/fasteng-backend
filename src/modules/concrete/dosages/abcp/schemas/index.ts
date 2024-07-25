import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";

export type ABCPDocument = HydratedDocument<ABCP>;

export type ABCPGeneralData = {
  userId: string;
  name: string;
  step: number
}

export type ABCPMaterialObject = {
  id: string,
  type: string
}

export type ABCPMaterialSelectionData = {
  name: string,
  coarseAggregate: ABCPMaterialObject;
  fineAggregate: ABCPMaterialObject;
  cement: ABCPMaterialObject;
}

export type ABCPEssaySelectionData = {
  name: string,
  fineAggregate: {
    _id: {
      id: string,
      type: string
    }
    specificMass: number;
    granulometry_id: string;
  };
  coarseAggregate: {
    _id: {
      id: string,
      type: string
    }
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
  name: string,
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

const ABCPSchema = SchemaFactory.createForClass(ABCP);
ABCPSchema.set('timestamps', true);
ABCPSchema.set('versionKey', false)

export { ABCPSchema };