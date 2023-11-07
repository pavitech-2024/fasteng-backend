import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_Abrasion_Out } from "../dto/calc-abrasion.dto";

export type AbrasionDocument = HydratedDocument<Abrasion>;

export type AbrasionGeneralData = {
  name: string
  material: Material
  userId: string
};

type abrasion_Calc = {
  initialMass: number
  finalMass: number
  graduation: string
};


@Schema({ collection: 'abrasions' })
export class Abrasion {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: AbrasionGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  abrasionCalc: abrasion_Calc;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Abrasion_Out;
  };
}

export const AbrasionSchema = SchemaFactory.createForClass(Abrasion);