import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";

export type SuperpaveDocument = HydratedDocument<Superpave>;

export type SuperpaveGeneralData = {
  userId: string;
  projectName: string;
  labName?: string;
  operator?: string;
  calculist?: string;
  trafficVolume: "low" | "medium" | "medium-high" | "high";
  objective: "bearing" | "bonding";
  dnitBand: "A" | "B" | "C";
  description?: string;
}

@Schema({ collection: 'superpaves'})
export class Superpave {
  _id: string;
  step: number;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: SuperpaveGeneralData;
}

export const SuperpaveSchema = SchemaFactory.createForClass(Superpave);
