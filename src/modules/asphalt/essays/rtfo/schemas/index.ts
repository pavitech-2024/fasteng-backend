import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_Rtfo_Out } from "../dto/calc-rtfo.dto";

export type RtfoDocument = HydratedDocument<Rtfo>;

export type RtfoGeneralData = {
  userId: string;
  name: string;
  material: Material;
};

type RtfoSamples = {
  sampleWeight: number,
  finalSampleWeight: number
}

type Rtfo_calc = {
  list: RtfoSamples[]
};

@Schema({ collection: 'rtfo' })
export class Rtfo {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: RtfoGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  rtfo: Rtfo_calc;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Rtfo_Out;
  };
}

export const RtfoSchema = SchemaFactory.createForClass(Rtfo);