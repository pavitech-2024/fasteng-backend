import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_Ddui_Out } from "../dto/calc-ddui.dto";

export type DduiDocument = HydratedDocument<Ddui>;

export type DduiGeneralData = {
  userId: string;
  name: string;
  material: Material;
};

export type Ddui_Step2 = {
  dnitRange: string;
  sampleVoidVolume: number;
  pressConstant: number;
  pressSpecification: string;
  sampleOrigin: string;
};

export type Ddui_Step3 = {
  ddui_data: {
    sampleName: string,
    condicionamento: string,
    d1: number,
    d2: number,
    d3: number,
    h1: number,
    h2: number,
    h3: number,
    pressReading: number,
  }[]
};

@Schema({ collection: 'ddui', timestamps: true })
export class Ddui {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: DduiGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  dduiStep2: Ddui_Step2;

  @IsNotEmpty()
  @Prop({ type: Object })
  dduiStep3: Ddui_Step3;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Ddui_Out;
  };
}

export const DduiSchema = SchemaFactory.createForClass(Ddui);