import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_SofteningPoint_Out } from "../dto/calc-softeningPoint.dto";

export type SofteningPointDocument = HydratedDocument<SofteningPoint>;

export type SofteningPointGeneralData = {
  userId: string;
  name: string;
  material: Material;
};

type SofteningPoint_calc = {
  sandLevel: number,
  clayLevel: number
};

@Schema({ collection: 'softeningPoint' })
export class SofteningPoint {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: SofteningPointGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  softeningPoint: SofteningPoint_calc;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_SofteningPoint_Out;
  };
}

export const SofteningPointSchema = SchemaFactory.createForClass(SofteningPoint);