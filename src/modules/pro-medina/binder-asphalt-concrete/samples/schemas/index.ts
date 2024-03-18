import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type BinderAsphaltConcrete_SamplesDocument = HydratedDocument<BinderAsphaltConcrete_Sample>;

export type BinderAsphaltConcreteGeneralData = {
  name: string;
  zone: string;
  layer: string;
  highway: string;
  cityState: string;
  guideLineSpeed: string;
  observations?: string;
};

export type BinderAsphaltConcreteStep2Data = {
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

export type BinderAsphaltConcreteStep3Data = {
  // PavimentData
  refinery: string; // Refinaria
  company: string; // Empresa
  collectionDate: string; // Data do carregamento
  invoiceNumber: string; // Número da nota fiscal
  dataInvoice: string; // Data da nota fiscal
  certificateDate: string; // Data do certificado
  capType: string; // Tipo de CAP
  performanceGrade: string; // Performance grade (PG)
  penetration: string; // Penetração - 25°C (mm)
  softeningPoint: string; // Ponto de amolecimento (°C)
  elasticRecovery: string; // Recuperação elástica - 25°C (%)
  // Viscosidade Brookfield
  vb_sp21_20: string; // 135°C (SP21, 20rpm)
  vb_sp21_50: string; // 150°C (SP21, 50rpm)
  vb_sp21_100: string; // 177°C (SP21, 100rpm)
  observations: string; // Observações
};

export type BinderAsphaltConcreteStep4Data = {
  granulometricRange: string;
  tmn: string;
  asphaltTenor: string;
  specificMass: string;
  volumeVoids: string;
  abrasionLA: string;
  rt: string;
  flowNumber: string;
  mr: string;
  // Diametral Compression Fatigue Curve
  fatigueCurve_n_cps: string;
  fatigueCurve_k1: string;
  fatigueCurve_k2: string;
  fatigueCurve_r2: string;
  observations: string;
};

@Schema({ collection: 'binderAsphaltConcreteSamples' })
export class BinderAsphaltConcrete_Sample {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: BinderAsphaltConcreteGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: BinderAsphaltConcreteStep2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  step3Data: BinderAsphaltConcreteStep3Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  step4Data: BinderAsphaltConcreteStep4Data;
}

export const BinderAsphaltConcrete_SampleSchema = SchemaFactory.createForClass(BinderAsphaltConcrete_Sample);
