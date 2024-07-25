import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type StabilizedLayers_SamplesDocument = HydratedDocument<StabilizedLayers_Sample>;

export type StabilizedLayersGeneralData = {
  name: string;
  zone: string;
  layer: string;
  highway: string;
  cityState: string;
  guideLineSpeed: string;
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
  trafficLiberation: string;
  averageAltitude: string;
  numberOfTracks: string;
  monitoredTrack: string;
  trackWidth: string;
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
};

export type StabilizedLayersStep3Data = {
  // Paviment Data
  stabilizer: string;
  tenor: string;
  especificMass: string;
  compressionEnergy: string;
  rtcd: string;
  rtf: string;
  rcs: string;
  granulometricRange: string;
  optimalHumidity: string;
  // Resilience module
  rsInitial: string;
  rsFinal: string;
  constantA: string;
  constantB: string;
  // Material fatigue
  k1psi1: string;
  k2psi2: string;
  observations: string;
};

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
