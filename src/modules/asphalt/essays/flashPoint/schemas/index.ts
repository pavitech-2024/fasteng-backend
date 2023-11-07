import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Material } from '../../../materials/schemas';
import { Calc_FLASHPOINT_Out } from '../dto/calc.flashPoint.dto';
import { IsNotEmpty } from 'class-validator';

export type FlashPointDocument = HydratedDocument<FlashPoint>;

export type FlashPointGeneralData = {
  userId: string;
  name: string;
  material: Material;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

type FlashPoint_step2Data = {
  ignition_temperature: number;
};

@Schema({ collection: 'flashPoints' })
export class FlashPoint {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: FlashPointGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: FlashPoint_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_FLASHPOINT_Out;
  };
}

export const FlashPointSchema = SchemaFactory.createForClass(FlashPoint);
