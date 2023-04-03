import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type SampleDocument = HydratedDocument<Sample>;

@Schema({ collection: 'samples' })
export class Sample {
  @IsNotEmpty()
  @Prop()
  name: string;
}

export const SampleSchema = SchemaFactory.createForClass(Sample);
