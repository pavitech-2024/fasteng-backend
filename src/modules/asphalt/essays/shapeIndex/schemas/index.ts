import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Material } from '../../../materials/schemas';
import { Calc_SHAPEINDEX_Out } from '../dto/calc.shapeIndex.dto';
import { IsNotEmpty } from 'class-validator';

export type ShapeIndexDocument = HydratedDocument<ShapeIndex>;

export type ShapeIndexGeneralData = {
  userId: string;
  name: string;
  material: Material;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

export type ShapeIndexCircularSieveRow = {
    label: string;
    sieve1: number;
    sieve2: number;
}

export type ShapeIndexSieveRow = {
    label: string;
    retained_mass: number;
    grains_count: number;
}

export type ShapeIndexReadRow = {
  id: number;
  sieve: string;
  length: number;
  thickness: number;
}

type ShapeIndex_step2Data = {
    method: 'sieve' | 'pachymeter';
    total_mass: number;
    graduation: 'A' | 'B' | 'C' | 'D';
    circular_sieves_table_data: ShapeIndexCircularSieveRow[];
    sieves_table_data: ShapeIndexSieveRow[];
    reads_table_data: ShapeIndexReadRow[];
};

@Schema({ collection: 'shapeIndexs' })
export class ShapeIndex {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: ShapeIndexGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: ShapeIndex_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_SHAPEINDEX_Out;
  };
}

export const ShapeIndexSchema = SchemaFactory.createForClass(ShapeIndex);
