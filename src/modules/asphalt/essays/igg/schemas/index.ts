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

export type igg_step2 = {
  work: string;
  section: number;
  initialStake: number;
  initialSide: string;
  finalStake: number;
  finalSide: string;
};

export type igg_step3 = {
  stakes: [];
};

export type igg_step4 = {
  sections: {
    id: number;
    initial: number;
    final: number;
  }[];
};

export type Results = {
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
  iggStep2: igg_step2;

  @IsNotEmpty()
  @Prop({ type: Object })
  iggStep3: igg_step3;

  @IsNotEmpty()
  @Prop({ type: Object })
  iggStep4: igg_step4;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Igg_Out;
  };
}

export const IggSchema = SchemaFactory.createForClass(Igg);
