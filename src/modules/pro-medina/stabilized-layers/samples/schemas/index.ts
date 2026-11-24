import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type StabilizedLayers_SamplesDocument = HydratedDocument<StabilizedLayers_Sample>;

export type StabilizedLayersGeneralData = {
  // IDENTIFICAÇÃO
  name: string;
  tipoSecao: string;
  faseMonitoramento: string;
  liberacaoTrafico: string;
  utilizadaMedina: string;
  utilizadaLvec: string;
  dadosConfirmadosICT: string;
  observations?: string;

  // PREPARO DO PAVIMENTO
  iriPreReabilitacao: string;
  atPreReabilitacao: string;
  fresagem: string;
  espessuraFresagem: string;
  intervencaoBase: string;
  sami: string;
  pinturaLigacao: string;
  imprimacao: string;

  // DATA ÚLTIMA ATUALIZAÇÃO
  dataUltimaAtualizacao: string;
  tempoServicoAnos: string;
  tempoServicoMeses: string;

  // CARACTERÍSTICAS
  local: string;
  municipioEstado: string;
  extensao: string;
  velocidadeDiretriz: string;
  kmInicial: string;
  kmFinal: string;
  inicioEstaca: string;
  inicioMetros: string;
  fimEstaca: string;
  fimMetros: string;
  altitudeMedia: string;
  numeroFaixas: string;
  faixaMonitorada: string;
  larguraFaixa: string;

  // COORDENADAS
  latitudeI: string;
  longitudeI: string;
  latitudeF: string;
  longitudeF: string;

  // COMPOSIÇÃO ESTRUTURAL
  structuralComposition: {
    id: number;
    layer: string;
    material: string;
    thickness: string;
  }[];

  imagemEstrutural: string;
  dataImagens: string;
};

export type StabilizedLayersStep2Data = {
  layers: {
    id: string;
    title: string;
    teorCimento: string;
    rt: string;
    rtcd: string;
    rcs: string;
    faixaGranulometrica: string;
    massaEspecifica: string;
    umidadeOtima: string;
    energiaCompactacao: string;
    ei: string;
    ef: string;
    constanteA: string;
    constanteB: string;
    k1: string;
    k2: string;
  }[];
  observations: string;
};

@Schema({ collection: 'stabilizedLayersSamples', timestamps: true })
export class StabilizedLayers_Sample {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: StabilizedLayersGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: StabilizedLayersStep2Data;
}

export const StabilizedLayers_SampleSchema = SchemaFactory.createForClass(StabilizedLayers_Sample);