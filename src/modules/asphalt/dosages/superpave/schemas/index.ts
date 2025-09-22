import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document, HydratedDocument } from 'mongoose'; // ✅ Importe Document do mongoose
import {
  SuperpaveGeneralData,
  SuperpaveGranulometryEssayData,
  SuperpaveGranulometryEssayResults,
  SuperpaveMaterialData,
  GranulometryCompositionData,
  InitialBinderData,
  FirstCompressionData,
  FirstCompressionParamsData,
  ChosenCurvePercentagesData,
  SecondCompressionData,
  SecondCompressionParams,
  ConfirmationCompressionData,
  DosageResume
} from '../types/schema/superpave.types.schema';

@Schema({ collection: 'superpaves' })
export class Superpave {
  _id: string;
  step: number;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: SuperpaveGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  granulometryEssayData: SuperpaveGranulometryEssayData;

  @Prop({ type: Object })
  granulometryEssayResults: SuperpaveGranulometryEssayResults;

  @IsNotEmpty()
  @Prop({ type: Object })
  materialSelectionData: SuperpaveMaterialData;

  @IsNotEmpty()
  @Prop({ type: Object })
  granulometryCompositionData: GranulometryCompositionData;

  @IsNotEmpty()
  @Prop({ type: Object })
  initialBinderData: InitialBinderData;

  @IsNotEmpty()
  @Prop({ type: Object })
  firstCompressionData: FirstCompressionData;

  @IsNotEmpty()
  @Prop({ type: Object })
  firstCompressionParamsData: FirstCompressionParamsData;

  @IsNotEmpty()
  @Prop({ type: Object })
  chosenCurvePercentagesData: ChosenCurvePercentagesData;

  @IsNotEmpty()
  @Prop({ type: Object })
  secondCompressionData: SecondCompressionData;

  @IsNotEmpty()
  @Prop({ type: Object })
  secondCompressionParams: SecondCompressionParams;

  @IsNotEmpty()
  @Prop({ type: Object })
  confirmationCompressionData: ConfirmationCompressionData;

  @IsNotEmpty()
  @Prop({ type: Object })
  dosageResume: DosageResume;
}

// ✅ CORREÇÃO: Extenda com Document para incluir métodos do Mongoose
export type SuperpaveDocument = HydratedDocument<Superpave> & Document & {
  toObject(): Superpave;
  toJSON(): Superpave;
};

const SuperpaveSchema = SchemaFactory.createForClass(Superpave);
SuperpaveSchema.set('timestamps', true);
SuperpaveSchema.set('versionKey', false);

export { SuperpaveSchema };