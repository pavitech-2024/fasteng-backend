import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "modules/concrete/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_Concrete_RT_Out } from "../dto/calc.rt.dto";

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

type ConcreteRtSteptep2 = {
  dnitRange: string;
  sampleVoidVolume: number;
  pressConstant: number;
  pressSpecification: string;
  sampleOrigin: string;
};

type ConcreteRtStep3 = {
  data: {
    sampleName: string;
    d1: number;
    d2: number;
    height: number;
    pressReading: number;
  }[];
};

@Schema({ collection: 'Rt' })
export class RT {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: RtGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  concreteRtStep2: ConcreteRtSteptep2;

  @IsNotEmpty()
  @Prop({ type: Object })
  concreteRtStep3: ConcreteRtStep3;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Concrete_RT_Out;
  };
}

export const RTSchema = SchemaFactory.createForClass(RT);