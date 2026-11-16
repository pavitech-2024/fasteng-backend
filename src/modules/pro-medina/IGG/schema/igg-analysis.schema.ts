import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IggAnalysisDocument = IggAnalysis & Document;

@Schema({ _id: false })
class DefectCount {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  count: number;
}

const DefectCountSchema = SchemaFactory.createForClass(DefectCount);

@Schema({ _id: false })
class PavementStation {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  stationNumber: string;

  @Prop({ required: true })
  section: string;

  @Prop({ required: true })
  tri: number;

  @Prop({ required: true })
  tre: number;

  @Prop({ type: [DefectCountSchema], default: [] })
  defects: DefectCount[];

  @Prop()
  date?: string;
}

const PavementStationSchema = SchemaFactory.createForClass(PavementStation);

@Schema({ collection: 'iggAnalyses', timestamps: true })
export class IggAnalysis {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  road: string;

  @Prop({ required: true })
  section: string;

  @Prop()
  subtrack?: string;

  @Prop({ required: true })
  pavementType: string;

  @Prop({ required: true })
  evaluationDate: string;

  @Prop({ type: [PavementStationSchema], default: [] })
  stations: PavementStation[];

  @Prop({ type: Object })
  results?: {
    generalData: Record<string, unknown>;
    statistics: {
      flechas_TRI: { media: number; variancia: number };
      flechas_TRE: { media: number; variancia: number };
      F: number;
      FV: number;
      frequencias_absolutas: Record<number, number>;
      frequencias_relativas: Record<number, number>;
      IGI_tipos: Record<number, number>;
      IGI_F: number;
      IGI_FV: number;
      IGG: number;
      classificacao: string;
      cor_classificacao: string;
      estacao_critica: any;
      total_defeitos: number;
      composicao_igg: { fator: string; valor: number; tipo?: number }[];
      total_estacoes: number;
    };
  };

  @Prop({ default: 'draft', enum: ['draft', 'completed'] })
  status: string;

  @Prop()
  userId?: string;
}

export const IggAnalysisSchema = SchemaFactory.createForClass(IggAnalysis);

// Índices
IggAnalysisSchema.index({ name: 1 });
IggAnalysisSchema.index({ userId: 1 });
IggAnalysisSchema.index({ status: 1 });
IggAnalysisSchema.index({ createdAt: -1 });