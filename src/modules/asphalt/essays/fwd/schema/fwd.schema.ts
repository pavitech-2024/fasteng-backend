// src/modules/pro-medina/fwd/schemas/fwd-analysis.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FwdAnalysisDocument = FwdAnalysis & Document;

@Schema({ collection: 'fwdAnalyses', timestamps: true })
export class FwdAnalysis {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop([{
    type: {
      stationNumber: { type: Number, required: true },
      d0: { type: Number, required: true },
      d20: { type: Number, required: true },
      d30: { type: Number, required: true },
      d45: { type: Number, required: true },
      d60: { type: Number, required: true },
      d90: { type: Number, required: true },
      d120: { type: Number, required: true },
      d150: { type: Number, required: true },
      d180: { type: Number, required: true },
      date: { type: Date, required: false },
      airTemperature: { type: Number, required: false },
      pavementTemperature: { type: Number, required: false },
      appliedLoad: { type: Number, required: false }
    }
  }])
  samples: any[];

  @Prop({ default: 'active', enum: ['active', 'completed'] })
  status: string;

  @Prop({ required: false })
  userId?: string;
}

export const FwdAnalysisSchema = SchemaFactory.createForClass(FwdAnalysis);

// Índices
FwdAnalysisSchema.index({ name: 1 });
FwdAnalysisSchema.index({ userId: 1 });
FwdAnalysisSchema.index({ status: 1 });
FwdAnalysisSchema.index({ createdAt: -1 });