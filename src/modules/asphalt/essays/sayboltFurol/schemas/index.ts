import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_SayboltFurol_Out } from "../dto/calc-sayboltFurol.dto";

export type SayboltFurolDocument = HydratedDocument<SayboltFurol>;

export type SayboltFurolGeneralData = {
  userId: string;
  name: string;
  material: Material;
};

type SayboltFurol_calc = {
  viscosityType: string,
  modified: boolean,
  dataPoints: [{
    temperature: number,
    viscosity: number
  }],
};

@Schema({ collection: 'sayboltFurol' })
export class SayboltFurol {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: SayboltFurolGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  sayboltFurol: SayboltFurol_calc;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_SayboltFurol_Out;
  };
}

export const SayboltFurolSchema = SchemaFactory.createForClass(SayboltFurol);