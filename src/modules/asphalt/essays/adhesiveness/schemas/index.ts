import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_Adhesiveness_Out } from "../dto/calc.adhesiveness.dto";

export type AdhesivenessDocument = HydratedDocument<Adhesiveness>;

export type AdhesivenessGeneralData = {
  userId: string;
  name: string;
  material: Material;
};

type Adhesiveness_calc = {
  filmDisplacement: boolean;
  binder: Material
};

@Schema({ collection: 'adhesions' })
export class Adhesiveness {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: AdhesivenessGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  adhesiveness: Adhesiveness_calc;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Adhesiveness_Out;
  };
}

export const AdhesivenessSchema = SchemaFactory.createForClass(Adhesiveness);