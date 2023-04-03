import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type MaterialDocument = HydratedDocument<Material>;

@Schema({ collection: 'materials' })
export class Material {
  @IsNotEmpty()
  @Prop()
  name: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
