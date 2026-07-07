import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type BinderAsphaltConcrete_SamplesDocument = HydratedDocument<BinderAsphaltConcrete_Sample>;

export type BinderAsphaltConcreteGeneralData = {
  name: string;
  identification?: string;
  tipoSecao?: string;
  faseMonitoramento?: string;
  liberacaoTrafico?: string;
  utilizadaMedina?: string;
  utilizadaLvec?: string;
  dadosConfirmadosICT?: string;
  observations?: string;
  iriPreReabilitacao?: string;
  atPreReabilitacao?: string;
  fresagem?: string;
  espessuraFresagem?: string;
  intervencaoBase?: string;
  sami?: string;
  pinturaLigacao?: string;
  imprimacao?: string;
  dataUltimaAtualizacao?: string;
  tempoServicoAnos?: string;
  tempoServicoMeses?: string;
  local?: string;
  municipioEstado?: string;
  extensao?: string;
  velocidadeDiretriz?: string;
  kmInicial?: string;
  kmFinal?: string;
  inicioEstaca?: string;
  inicioMetros?: string;
  fimEstaca?: string;
  fimMetros?: string;
  altitudeMedia?: string;
  numeroFaixas?: string;
  faixaMonitorada?: string;
  larguraFaixa?: string;
  latitudeI?: string;
  longitudeI?: string;
  latitudeF?: string;
  longitudeF?: string;
  camadasEstruturais?: {
    id: number;
    tipo: string;
    material: string;
    espessura: string;
  }[];
  imagemEstrutural?: string;
  dataImagens?: string;
};

export type BinderAsphaltConcreteStep3Data = {
  tipoTratamento: string;
  tipoEmulsao: string;
  taxaEmulsao: string;
  taxaAgregados: string;
  faixaGranulometrica: string;
  abrasaoLosAngeles: string;
  massaEspecifica: string;
  referenciaComercial: string;
  refinaria: string;
  empresaDistribuidora: string;
  dataCarregamento: string;
  numeroNotaFiscal: string;
  dataNotaFiscal: string;
  numeroCertificado: string;
  dataCertificado: string;
  viscosidadeSSF: string;
  peneiracao: string;
  residuo: string;
  cargaParticula: string;
  penetracao: string;
  recuperacaoElastica: string;
  pontoAmolecimento: string;
  observacoes: string;
};

export type BinderAsphaltConcreteStep4Data = {
  referenciaComercial: string;
  refinaria: string;
  empresaDistribuidora: string;
  dataCarregamento: string;
  numeroNotaFiscal: string;
  dataNotaFiscal: string;
  numeroCertificado: string;
  dataCertificado: string;
  tipoCAP: string;
  performanceGrade: string;
  penetracao25: string;
  pontoAmolecimento: string;
  viscosidadeBrookfield_135: string;
  viscosidadeBrookfield_150: string;
  viscosidadeBrookfield_177: string;
  recuperacaoElastica: string;
  dsr_original: { temp: string; G_sen: string }[];
  dsr_rtfot: { temp: string; G_sen: string }[];
  mscr_Jnr_3_2: string;
  mscr_Jndiff: string;
  las_temperatura: string;
  las_strain_1_25: string;
  las_strain_2_5: string;
  las_strain_5: string;
  las_af: string;
  las_FFL: string;
  las_D: string;
  bbr_S: string;
  bbr_m: string;
  bbr_temp: string;
  observacoes: string;
};

export type BinderAsphaltConcreteStep5Data = {
  tipoCAP: string;
  massaEspecifica: string;
  resistenciaTracao: string;
  teorAsfalto: string;
  volumeVazios: string;
  faixaGranulometrica: string;
  tmn: string;
  abrasaoLosAngeles: string;
  flowNumber: string;
  moduloResiliencia: string;
  curvaFadiga_n_cps: string;
  curvaFadiga_k1: string;
  curvaFadiga_k2: string;
  curvaFadiga_r2: string;
  sigmoidal_a: string;
  sigmoidal_b: string;
  sigmoidal_d: string;
  sigmoidal_g: string;
  sigmoidal_a1: string;
  sigmoidal_a2: string;
  sigmoidal_a3: string;
  parametro_alfa: string;
  dano_C10: string;
  dano_C11: string;
  dano_C12: string;
  dano_a: string;
  dano_b: string;
  dano_Y: string;
  dano_Delta: string;
  einf: string;
  prony_pi: string[];
  prony_Ei: string[];
  shiftModel_n_cps: string;
  shiftModel_ε0: string;
  shiftModel_N1: string;
  shiftModel_β: string;
  shiftModel_p1: string;
  shiftModel_p2: string;
  shiftModel_d1: string;
  shiftModel_d2: string;
  observacoes: string;
};

@Schema({ collection: 'binderAsphaltConcreteSamples', timestamps: true })
export class BinderAsphaltConcrete_Sample {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: BinderAsphaltConcreteGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step3Data: BinderAsphaltConcreteStep3Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  step4Data: BinderAsphaltConcreteStep4Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  step5Data: BinderAsphaltConcreteStep5Data;
}

export const BinderAsphaltConcrete_SampleSchema = SchemaFactory.createForClass(BinderAsphaltConcrete_Sample);