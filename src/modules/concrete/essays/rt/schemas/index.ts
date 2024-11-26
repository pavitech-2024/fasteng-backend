import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";
import { Calc_Concrete_RT_Out } from "../dto/calc.rt.dto";

export type RtDocument = HydratedDocument<RT>;

export type RtGeneralData = {
  userId: string;
  name: string;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

type ConcreteRtSteptep2 = {
  age: number;
  tolerance: number;
  appliedCharge: number;
  supportsDistance: number;
};

type ConcreteRtStep3 = {
  graphImg: {
    name: string;
    src: string;
  }
};

type ConcreteRtStep4 = {
  compressionCharge: number;
  graphImg: {
    name: string;
    src: string;
  }
};

@Schema({ collection: 'rt' })
export class RT {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: RtGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: ConcreteRtSteptep2;

  @IsNotEmpty()
  @Prop({ type: Object })
  step3Data: ConcreteRtStep3;

  @IsNotEmpty()
  @Prop({ type: Object })
  step4Data: ConcreteRtStep4;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Concrete_RT_Out;
  };
}

export const RTSchema = SchemaFactory.createForClass(RT);