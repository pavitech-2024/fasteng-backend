import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "modules/concrete/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_SandSwelling_Out } from "../dto/calc.sand-swelling.dto";

export type SandSwellingDocument = HydratedDocument<SandSwelling>;

export type SandSwellingGeneralData = {
  name: string;
  material: Material
};


@Schema({ collection: 'sandSwelling' })
export class SandSwelling {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: SandSwellingGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_SandSwelling_Out;
  };
}

export const SandSwellingSchema = SchemaFactory.createForClass(SandSwelling);
