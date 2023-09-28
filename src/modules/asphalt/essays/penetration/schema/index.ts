import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_Penetration_Out } from "../dto/calc.penetration.dto";

export type PenetrationDocument = HydratedDocument<Penetration>;

export type PenetrationGeneralData = {
  name: string
  material: Material
  userId: string
};

type penetration_Calc = {
  resultMode: boolean
  experimentDate: Date
  points: number[]
};


@Schema({ collection: 'penetrations' })
export class Penetration {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: PenetrationGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  penetrationCalc: penetration_Calc;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Penetration_Out;
  };
}

export const PenetrationSchema = SchemaFactory.createForClass(Penetration);