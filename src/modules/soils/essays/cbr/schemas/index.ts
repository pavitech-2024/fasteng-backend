import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Sample } from '../../../samples/schemas';
import { Calc_CBR_Out } from '../dto/calc.cbr.dto';
import { IsNotEmpty } from 'class-validator';

export type CbrDocument = HydratedDocument<Cbr>;

export type CbrGeneralData = {
  userId: string;
  name: string;
  sample: Sample;
  createdAt: Date;
  operator?: string;
  cauculist?: string;
  description?: string;
};

type cbr_step2Data = {
  ring_constant: number;
  cilinder_height: number;
  extended_reads: [
    { minimum_read: '0.5'; pol: '0.025'; mm: '0.63'; extended_read: number },
    { minimum_read: '1'; pol: '0.05'; mm: '1.27'; extended_read: number },
    { minimum_read: '1.5'; pol: '0.075'; mm: '1.90'; extended_read: number },
    { minimum_read: '2'; pol: '0.1'; mm: '2.54'; extended_read: number },
    { minimum_read: '3'; pol: '0.15'; mm: '3.81'; extended_read: number },
    { minimum_read: '4'; pol: '0.2'; mm: '5.08'; extended_read: number },
    { minimum_read: '6'; pol: '0.3'; mm: '7.62'; extended_read: number },
    { minimum_read: '8'; pol: '0.4'; mm: '10.16'; extended_read: number },
    { minimum_read: '10'; pol: '0.5'; mm: '12.7'; extended_read: number },
  ];
};

type cbr_expansionData = {
  id: number;
  date: Date;
  time: Date;
  deflectometer_read: number;
}[];

@Schema({ collection: 'cbrs' })
export class Cbr {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: CbrGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: cbr_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  expansionData: cbr_expansionData;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_CBR_Out;
  };
}

export const CbrSchema = SchemaFactory.createForClass(Cbr);
