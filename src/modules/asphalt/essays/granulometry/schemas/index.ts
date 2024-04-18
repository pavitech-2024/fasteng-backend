import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_AsphaltGranulometry_Out } from "../dto/asphalt.calc.granulometry.dto";


export type AsphaltGranulometryDocument = HydratedDocument<AsphaltGranulometry>;

export type AsphaltGranulometryGeneralData = {
  userId: string;
  name: string;
  material: Material;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

type AsphaltGranulometry_step2Data = {
  material_mass: number;
  table_data: { sieve_label: string; sieve_value: number, passant: number, retained: number }[];
  bottom: number;
};

@Schema({ collection: 'granulometrys' })
export class AsphaltGranulometry {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: AsphaltGranulometryGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: AsphaltGranulometry_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: Calc_AsphaltGranulometry_Out;
  ;
}

export const AsphaltGranulometrySchema = SchemaFactory.createForClass(AsphaltGranulometry);