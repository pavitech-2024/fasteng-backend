import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_Adhesion_Out } from "../dto/calc.adhesion.dto";

export type AdhesionDocument = HydratedDocument<Adhesion>;

export type AdhesionGeneralData = {
  userId: string;
  name: string;
  material: Material;
};

type Adhesion_calc = {
  filmDisplacement: boolean;
};

@Schema({ collection: 'adhesions' })
export class Adhesion {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: AdhesionGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  adhesion: Adhesion_calc;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Adhesion_Out;
  };
}

export const AdhesionSchema = SchemaFactory.createForClass(Adhesion);