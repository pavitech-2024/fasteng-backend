import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Sample } from '../../../samples/schemas';
import { Calc_SoilsGranulometry_Out } from '../dto/calc.granulometry.dto';
import { IsNotEmpty } from 'class-validator';

export type SoilsGranulometryDocument = HydratedDocument<SoilsGranulometry>;

export type SoilsGranulometryGeneralData = {
  userId: string;
  name: string;
  sample: Sample;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

type SoilsGranulometry_step2Data = {
  sample_mass: number;
  table_data: { sieve: string; passant: number, retained: number }[];
  bottom: number;
};

@Schema({ collection: 'granulometrys' })
export class SoilsGranulometry {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: SoilsGranulometryGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: SoilsGranulometry_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_SoilsGranulometry_Out;
  };
}

export const SoilsGranulometrySchema = SchemaFactory.createForClass(SoilsGranulometry);
