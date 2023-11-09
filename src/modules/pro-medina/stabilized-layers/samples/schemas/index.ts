import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";

export type StabilizedLayers_SamplesDocument = HydratedDocument<StabilizedLayers_Sample>;

export type StabilizedLayersGeneralData = {
  name: string;
  zone: string;
  layer: string;
  cityState: string;
  observations?: string;
};

export type StabilizedLayersStep2Data = {
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
  // Structural Composition
  structuralComposition: {
    id: number;
    layer: unknown;
    material: unknown;
    thickness: unknown;
  }[];
}

export type StabilizedLayersStep3Data = {
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

@Schema({ collection: 'stabilizedLayersSamples' })
export class StabilizedLayers_Sample {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: StabilizedLayersGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: StabilizedLayersStep2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  step3Data: StabilizedLayersStep3Data;
}

export const StabilizedLayers_SampleSchema = SchemaFactory.createForClass(StabilizedLayers_Sample);