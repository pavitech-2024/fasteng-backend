import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";

export type GranularLayers_SamplesDocument = HydratedDocument<GranularLayers_Sample>;

@Schema({ collection: 'granularLayersSamples' })
export class GranularLayers_Sample {
  _id: string;

  @IsNotEmpty()
  @Prop()
  name: string;

  @IsNotEmpty()
  @Prop()
  userId: string;
}

export const GranularLayers_SampleSchema = SchemaFactory.createForClass(GranularLayers_Sample);