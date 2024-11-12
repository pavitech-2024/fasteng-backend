import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Material } from 'modules/concrete/materials/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_CONCRETERC_Out } from '../dto/calc.rc.dto';

export type RCDocument = HydratedDocument<RC>;

export type RCGeneralData = {
  userId: string;
  name: string;
  material: Material;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

export type RC_step2Data = {
  diammeter1: number;
  diammeter2: number;
  height: number;
  age: number;
  tolerance: number;
  maximumStrength: number;
};

type RC_step3Data = {
  rupture: {
    type: string;
    src: string;
  };
  graphImg: {
    name: string;
    src: string;
  };
};

@Schema({ collection: 'rcs' })
export class RC {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: RCGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: RC_step2Data[];

  @IsNotEmpty()
  @Prop({ type: Object })
  step3Data: RC_step3Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_CONCRETERC_Out;
  };
}

export const RCSchema = SchemaFactory.createForClass(RC);
