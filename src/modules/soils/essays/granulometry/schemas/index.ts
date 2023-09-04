import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Sample } from '../../../samples/schemas';
import { Calc_GRANULOMETRY_Out } from '../dto/calc.granulometry.dto';
import { IsNotEmpty } from 'class-validator';

export type GranulometryDocument = HydratedDocument<Granulometry>;

export type GranulometryGeneralData = {
  userId: string;
  name: string;
  sample: Sample;
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

@Schema({ collection: 'granulometrys' })
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
    data: Calc_GRANULOMETRY_Out;
  };
}

export const GranulometrySchema = SchemaFactory.createForClass(Granulometry);
