import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_SandEquivalent_Out } from "../dto/calc-sandEquivalent.dto";

export type SandEquivalentDocument = HydratedDocument<SandEquivalent>;

export type SandEquivalentGeneralData = {
  userId: string;
  name: string;
  material: Material;
};

type SandEquivalent_calc = {
  sandLevel: number,
  clayLevel: number
};

@Schema({ collection: 'sandEquivalent' })
export class SandEquivalent {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: SandEquivalentGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  sandEquivalent: SandEquivalent_calc;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_SandEquivalent_Out;
  };
}

export const SandEquivalentSchema = SchemaFactory.createForClass(SandEquivalent);