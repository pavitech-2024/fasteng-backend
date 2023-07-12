import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Sample } from 'modules/soils/samples/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_Compression_Out } from '../dto/calc.compression.dto';

export type CompressionDocument = HydratedDocument<Compression>;

export type CompressionGeneralData = {
  userId: string;
  name: string;
  sample: Sample;
  createdAt: Date;
  operator?: string;
  cauculist?: string;
  description?: string;
};

type calculation = {
  capsule: string[];
  capsule_tare: number[];
  wet_gross_weight_capsule: number[];
  dry_gross_weight: number[];
  mold_weight: number;
  mold_volume: number;
  mold_number: string;
  socket_weight: number;
  space_disc_thickness: number;
  strokes_per_layer: number;
  layers: number;
  wet_gross_weights: number[];
  capsules: string[];
  capsules_tare: number[];
  wet_gross_weights_capsule: number[];
  dry_gross_weights: number[];
};

@Schema({ collection: 'compression' })
export class Compression {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: CompressionGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  calculation: calculation;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Compression_Out;
  };
}

export const CompressionSchema = SchemaFactory.createForClass(Compression);
