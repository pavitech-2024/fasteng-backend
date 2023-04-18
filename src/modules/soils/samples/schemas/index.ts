import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type SampleDocument = HydratedDocument<Sample>;

@Schema({ collection: 'samples' })
export class Sample {
  _id: string;

  @IsNotEmpty()
  @Prop()
  name: string;

  @IsNotEmpty()
  @Prop()
  type: 'inorganicSoil' | 'organicSoil' | 'pavimentLayer';

  @IsNotEmpty()
  @Prop()
  userId: string;

  @IsNotEmpty()
  @Prop()
  createdAt: Date;

  @Prop({ type: Object })
  description: {
    construction?: string; // obra
    provenance?: string; // procedência
    snippet?: string; // trecho
    stake?: string; // estaca
    exd?: string; // lado E-X-D
    depth?: string; // profundidade (cm)
    layer?: string; // camada
    collectionDate?: Date; // data da coleta
    observation?: string; // observação
  };
}

export const SampleSchema = SchemaFactory.createForClass(Sample);
