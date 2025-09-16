import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Calc_Fwd_Out } from '../dto/calc-fwd.dto';
export type FwdDocument = HydratedDocument<Fwd>;

export type FwdGeneralData = {
  userId: string;
  name: string;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

export type Fwd_step2 = {
  work: string;
  section: number;
  initialStake: number;
  initialSide: string;
  finalStake: number;
  finalSide: string;
};

export type Fwd_step3 = {
  spreadsheetData: {
    hodometro: number;
    force: number;
    d1: number;
    d2: number;
    d3: number;
    d4: number;
    d5: number;
    d6: number;
    d7: number;
    d8: number;
    d9: number;
    d10: number;
    d11: number;
    d12: number;
    d13: number;
  }[];
};

export type Results = {
  results: {
    data: Calc_Fwd_Out;
  };
};

@Schema({ collection: 'fwd', timestamps: true })
export class Fwd {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: FwdGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  fwdStep2: Fwd_step2;

  @IsNotEmpty()
  @Prop({ type: Object })
  fwdStep3: Fwd_step3;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Fwd_Out;
  };
}

export const FwdSchema = SchemaFactory.createForClass(Fwd);
