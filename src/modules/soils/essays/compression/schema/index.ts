import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Sample } from "modules/soils/samples/schemas";
import { HydratedDocument } from "mongoose";

export type CompressionDocument = HydratedDocument<Compression>

export type CompressionGeneralData = {
  userId: string
  name: string;
  sample: Sample;
  createdAt: Date;
  operator?: string;
  cauculist?: string;
  description?: string;
};

type compression_step2Data = {

}

@Schema({ collection: 'compression' })
export class Compression {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: CompressionGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: compression_step2Data;
}

export const CompressionSchema = SchemaFactory.createForClass(Compression);