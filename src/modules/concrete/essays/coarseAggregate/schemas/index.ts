import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "../../../materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_CoarseAggregateSpecificMass_Out } from "../dto/calc.coarseAggregateSpecificMass.dto";

export type CoarseAggregateSpecificMassDocument = HydratedDocument<CoarseAggregateSpecificMass>;

export type CoarseAggregateSpecificMassGeneralData = {
  userId: string;
  name: string;
  material: Material;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

type coarseAggregateSpecificMass_step2Data = {
  material_mass: number;
  table_data: { sieve: string; passant: number, retained: number }[];
  bottom: number;
};

@Schema({ collection: 'coarseAggregateSpecificMass' })
export class CoarseAggregateSpecificMass {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: CoarseAggregateSpecificMassGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: coarseAggregateSpecificMass_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_CoarseAggregateSpecificMass_Out;
  };
}

export const CoarseAggregateSpecificMassSchema = SchemaFactory.createForClass(CoarseAggregateSpecificMass);