import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "modules/concrete/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_CONCRETERT_Out } from "../dto/calc.rt.dto";

export type RtDocument = HydratedDocument<RT>;

export type RtGeneralData = {
  userId: string;
  name: string;
  material: Material;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

type Rt_step2Data = {
  material_mass: number;
  table_data: { sieve: string; passant: number, retained: number }[];
  bottom: number;
};

@Schema({ collection: 'Rt' })
export class RT {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: RtGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: Rt_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_CONCRETERT_Out;
  };
}

export const RTSchema = SchemaFactory.createForClass(RT);