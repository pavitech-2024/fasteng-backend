import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Sample } from '../../../samples/schemas';
import { Calc_SUCS_Out } from '../dto/calc.sucs.dto';
import { IsNotEmpty } from 'class-validator';

export type SucsDocument = HydratedDocument<Sucs>;

export type SucsGeneralData = {
  userId: string;
  name: string;
  sample: Sample;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

type sucs_step2Data = {
  cc: number;
  cnu: number;
  liquidity_limit: number;
  plasticity_limit: number;
  sieves: { sieve: string; passant: number }[];
  organic_matter: boolean;
};

@Schema({ collection: 'sucss' })
export class Sucs {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: SucsGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: sucs_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_SUCS_Out;
  };
}

export const SucsSchema = SchemaFactory.createForClass(Sucs);
