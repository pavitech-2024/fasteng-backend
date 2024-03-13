import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";
import { GranulometryComposition_Marshall_Service } from "../service/granulometry-composition.marshall.service";

export type MarshallDocument = HydratedDocument<Marshall>;

export type MarshallGeneralData = {
  userId: string;
  name: string;
  laboratory?: string;
  operator?: string;
  calculist?: string;
  objective: "bearing" | "bonding";
  dnitBand: "A" | "B" | "C";
  description?: string;
}

export type MarshallMaterialData = {
  aggregates: {
    name: string,
    _id: string
  }[],
  binder: string
}

export type GranulometryCompositionData = {
  table_data: {
    table_rows: {
      sieve_label: string,
      _id: string,
      total_passant: string,
      passant: string,
    }
  }[],
  percentageInputs: { [key: string]: number }[];
  sumOfPercents: number[];
  dnitBands: { higher: [string, number][], lower: [string, number][] };
  pointsOfCurve: any[];
  percentsOfMaterials: any[];
  graphData: any[],
  name: string
}

@Schema({ collection: 'marshalls'})
export class Marshall {
  _id: string;
  step: number;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: MarshallGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  materialSelectionData: MarshallMaterialData

  @IsNotEmpty()
  @Prop({ type: Object })
  granulometryCompositionData: GranulometryCompositionData
}

const MarshallSchema = SchemaFactory.createForClass(Marshall);
MarshallSchema.set('timestamps', true);
MarshallSchema.set('versionKey', false)

export { MarshallSchema };