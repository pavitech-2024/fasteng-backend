import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Material } from 'modules/asphalt/materials/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_Rtcd_Out } from '../dto/calc-rtcd.dto';

export type RtcdDocument = HydratedDocument<Rtcd>;

export type RtcdGeneralData = {
  userId: string;
  name: string;
  material: Material;
};

type Rtcd_Step2 = {
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

@Schema({ collection: 'rtcd' })
export class Rtcd {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: RtcdGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  rtcdStep2: Rtcd_Step2;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Rtcd_Out;
  };
}

export const RtcdSchema = SchemaFactory.createForClass(Rtcd);
