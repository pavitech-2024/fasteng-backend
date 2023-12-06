import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Material } from '../../../materials/schemas';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import {Calc_CONCRETEGRANULOMETRY_Out } from '../dto/calc.granulometry.dto';

export type GranulometryDocument = HydratedDocument<Granulometry>;

export type GranulometryGeneralData = {
  userId: string;
  name: string;
  material: Material;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

type granulometry_step2Data = {
  sample_mass: number;
  table_data: { sieve: string; passant: number, retained: number }[];
  bottom: number;
};

@Schema({ collection: 'granulometry' })
export class Granulometry {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: GranulometryGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: granulometry_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_CONCRETEGRANULOMETRY_Out;
  };
}

export const GranulometrySchema = SchemaFactory.createForClass(Granulometry);