import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type GranularLayers_SamplesDocument = HydratedDocument<GranularLayers_Sample>;

export type GranularLayersGeneralData = {
  // IDENTIFICAÇÃO
  name: string;
  tipoSecao: string;
  faseMonitoramento: string;
  liberacaoTrafico: string;
  utilizadaMedina: string;
  utilizadaLvec: string;
  dadosConfirmadosICT: string;
  observation: string;

  // PREPARO DO PAVIMENTO
  iriPrerehabilitation: string;
  atPrerehabilitation: string;
  fresagem: string;
  millingThickness: string;
  interventionAtTheBase: string;
  sami: string;
  bondingPaint: string;
  priming: string;

  // DATA ÚLTIMA ATUALIZAÇÃO
  lastUpdate: string;
  serviceTimeYears: string;
  serviceTimeMonths: string;

  // CARACTERÍSTICAS
  roadName: string;
  cityState: string;
  experimentalLength: string;
  guideSpeed: string;
  kmInicial: string;
  kmFinal: string;
  inicioEstaca: string;
  inicioMetros: string;
  fimEstaca: string;
  fimMetros: string;
  averageAltitude: string;
  numberOfTracks: string;
  monitoredTrack: string;
  trackWidth: string;

  // COMPOSIÇÃO ESTRUTURAL
  structuralComposition: {
    id: number;
    layer: string;
    material: string;
    thickness: string;
  }[];

  images: string;
  imagesDate: string;
};

export type GranularLayersStep2Data = {
  layers: {
    id: string;
    name: string;
    mctCoefficientC: string;
    mctIndexE: string;
    especificMass: string;
    optimalHumidity: string;
    compressionEnergy: string;
    k1: string;
    k2: string;
    k3: string;
    k4: string;
    k1psi1: string;
    k2psi2: string;
    k3psi3: string;
    k4psi4: string;
  }[];
  observations: string;
};

@Schema({ 
  collection: 'granularLayersSamples',
  timestamps: true, 
})
export class GranularLayers_Sample {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: GranularLayersGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: GranularLayersStep2Data;
}

export const GranularLayers_SampleSchema = SchemaFactory.createForClass(GranularLayers_Sample);