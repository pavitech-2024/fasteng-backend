import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Sample } from '../../../samples/schemas';

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

@Schema({ collection: 'cbrs' })
export class Cbr {
  _id: string;
  generalData: CbrGeneralData;
}

export const CbrSchema = SchemaFactory.createForClass(Cbr);
