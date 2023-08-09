import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Sample } from '../../../samples/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_HRB_Out } from '../dto/calc.hrb.dto';

export type HrbGeneralData = {
  userId: string;
  name: string;
  sample: Sample;
  createdAt: Date;
  operator?: string;
  cauculist?: string;
  description?: string;
};

type HRB_step2Data = {
  tableData: {
    sieve: number;
    percent_passant: number;
  }[];
  liquidity_limit: number;
  plasticity_limit: number;
};

export type HrbDocument = HydratedDocument<Hrb>;

@Schema({ collection: 'hrbs' })
export class Hrb {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: HrbGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: HRB_step2Data;

  @Prop({ type: Object })
  results: {
    data: Calc_HRB_Out;
  };
}

export const HrbSchema = SchemaFactory.createForClass(Hrb);
