import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";

// Importando os tipos de um diretório separado
import {
  MarshallGeneralData,
  MarshallMaterialData,
  GranulometryCompositionData,
  BinderTrialData,
  MaximumMixtureDensityData,
  VolumetricParametersData,
  OptimumBinderContentData,
  ConfirmationCompressionData,
} from '../types';

export type MarshallDocument = HydratedDocument<Marshall>;

@Schema({ collection: 'marshalls' })
export class Marshall {
  _id: string;
  step: number;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: MarshallGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  materialSelectionData: MarshallMaterialData;

  @IsNotEmpty()
  @Prop({ type: Object })
  granulometryCompositionData: GranulometryCompositionData;

  @IsNotEmpty()
  @Prop({ type: Object })
  binderTrialData: BinderTrialData;

  @IsNotEmpty()
  @Prop({ type: Object })
  maximumMixtureDensityData: MaximumMixtureDensityData;

  @IsNotEmpty()
  @Prop({ type: Object })
  volumetricParametersData: VolumetricParametersData;

  @IsNotEmpty()
  @Prop({ type: Object })
  optimumBinderContentData: OptimumBinderContentData;

  @IsNotEmpty()
  @Prop({ type: Object })
  confirmationCompressionData: ConfirmationCompressionData;
}

const MarshallSchema = SchemaFactory.createForClass(Marshall);
MarshallSchema.set('timestamps', true);
MarshallSchema.set('versionKey', false);

export { MarshallSchema };
