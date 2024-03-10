import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Calc_Igg_Out } from '../dto/calc-igg.dto';
export type IggDocument = HydratedDocument<Igg>;

export type IggGeneralData = {
  userId: string;
  name: string;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

// TODO: Check if initial stake and final stake are needed in step2:
export type Igg_Step2 = {
  work: string;
  section: number;
  initialStake: number;
  initialSide: string;
  finalStake: number;
  finalSide: string;
};

export type Igg_Step3 = {
  sections: {
    initial: number;
    final: number;
  }[];
  stakes: [];
};

export type Igg_Step4 = {
  results: {
    data: Calc_Igg_Out;
  };
};

@Schema({ collection: 'igg' })
export class Igg {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: IggGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  iggStep2: Igg_Step2;

  @IsNotEmpty()
  @Prop({ type: Object })
  iggStep3: Igg_Step3;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Igg_Out;
  };
}

export const IggSchema = SchemaFactory.createForClass(Igg);
