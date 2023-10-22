import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Material } from 'modules/asphalt/materials/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_Rt_Out } from '../dto/calc-rt.dto';

export type RtDocument = HydratedDocument<Rt>;

export type RtGeneralData = {
  userId: string;
  name: string;
  material: Material;
};

type Rt_Step2 = {
  // laboratoryName: string,
  // responsible: string,
  // selectedDosage: string,
  // dnitRange: string,
  // sampleOrigin: string,
  // sampleVoidVolume: string,
  // pressSpecification: string,
  pressConstant: number;
  // experimentDate: Date,
  // minRrt: number,
  data: {
    sampleName: string;
    d1: number;
    d2: number;
    d3: number;
    h1: number;
    h2: number;
    h3: number;
    pressReading: number;
  }[];
};

@Schema({ collection: 'rt' })
export class Rt {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: RtGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  rtStep2: Rt_Step2;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Rt_Out;
  };
}

export const RtSchema = SchemaFactory.createForClass(Rt);
