import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Material } from '../../../materials/schemas';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import {Calc_ConcreteGranulometry_Out } from '../dto/calc.granulometry.dto';


export type ConcreteGranulometryDocument = HydratedDocument<ConcreteGranulometry>;

export type ConcreteGranulometryGeneralData = {
  userId: string;
  name: string;
  material: Material;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

type ConcreteGranulometry_step2Data = {
  material_mass: number;
  table_data: { sieve: string; passant: number, retained: number }[];
  bottom: number;
};

@Schema({ collection: 'granulometrys' })
export class ConcreteGranulometry {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: ConcreteGranulometryGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: ConcreteGranulometry_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_ConcreteGranulometry_Out;
  };
}

export const ConcreteGranulometrySchema = SchemaFactory.createForClass(ConcreteGranulometry);