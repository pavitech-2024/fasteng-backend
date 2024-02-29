import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";

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

@Schema({ collection: 'marshalls'})
export class Marshall {
  _id: string;
  step: number;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: MarshallGeneralData;
}

const MarshallSchema = SchemaFactory.createForClass(Marshall);
MarshallSchema.set('timestamps', true);
MarshallSchema.set('versionKey', false)

export { MarshallSchema };