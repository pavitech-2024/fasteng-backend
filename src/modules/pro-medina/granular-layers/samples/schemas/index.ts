import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";

export type GranularLayers_SamplesDocument = HydratedDocument<GranularLayers_Sample>;

export type GranularLayersGeneralData = {
  name: string;
  zone: string;
  layer: string;
  cityState: string;
  observations?: string;
};

export type GranularLayersStep2Data = {
  // PavimentData
  identification: string;
  sectionType: string;
  extension: string;
  initialStakeMeters: string;
  latitudeI: string;
  longitudeI: string;
  finalStakeMeters: string;
  latitudeF: string;
  longitudeF: string;
  monitoringPhase: string;
  observation: string;
  // Paviment Preparation
  milling: string;
  interventionAtTheBase: string;
  sami: string;
  bondingPaint: string;
  priming: string;
  images: string[];
  // Structural Composition
  structuralComposition: {
    id: number;
    layer: unknown;
    material: unknown;
    thickness: unknown;
  }[];
}

export type GranularLayersStep3Data = {
  // Paviment Data
  mctGroup: string;
  mctCoefficientC: string;
  mctIndexE: string;
  especificMass: string;
  compressionEnergy: string;
  granulometricRange: string;
  optimalHumidity: string;
  abrasionLA: string;
  // Resilience module
  k1: string;
  k2: string;
  k3: string;
  k4: string;
  // Permanent deformation
  k1psi1: string;
  k2psi2: string;
  k3psi3: string;
  k4psi4: string;
  observations: string;
}

@Schema({ collection: 'granularLayersSamples' })
export class GranularLayers_Sample {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: GranularLayersGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: GranularLayersStep2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  step3Data: GranularLayersStep3Data;
}

export const GranularLayers_SampleSchema = SchemaFactory.createForClass(GranularLayers_Sample);