import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_Ddui_Out } from "../dto/calc-ddui.dto";

export type DduiDocument = HydratedDocument<Ddui>;

export type DduiGeneralData = {
  userId: string;
  name: string;
  material: Material;
};

type Ddui_calc = {
  laboratoryName: string,
  responsible: string,
  selectedDosage: string,
  dnitRange: string,
  sampleOrigin: string,
  sampleVoidVolume: string,
  pressSpecification: string,
  pressConstant: number,
  experimentDate: Date,
  minRrt: number,
  data: {
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

@Schema({ collection: 'ddui' })
export class Ddui {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: DduiGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  ddui: Ddui_calc;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Ddui_Out;
  };
}

export const DduiSchema = SchemaFactory.createForClass(Ddui);