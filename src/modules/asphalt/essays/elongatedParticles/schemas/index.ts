import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Material } from '../../../materials/schemas';
import { Calc_ELONGATEDPARTICLES_Out } from '../dto/calc.elongatedParticles.dto';
import { IsNotEmpty } from 'class-validator';

export type ElongatedParticlesDocument = HydratedDocument<ElongatedParticles>;

export type ElongatedParticlesGeneralData = {
  userId: string;
  name: string;
  material: Material;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

export type ElongatedParticlesDimensionsRow = {
  ratio: string;
  sample_mass: number;
  mass: number;
};

export type ElongatedParticlesResultsDimensionsRow = {
  ratio: string;
  particles_percentage: number;
};

type ElongatedParticles_step2Data = {
  dimensions_table_data: ElongatedParticlesDimensionsRow[];
};

@Schema({ collection: 'elongatedParticless' })
export class ElongatedParticles {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: ElongatedParticlesGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: ElongatedParticles_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_ELONGATEDPARTICLES_Out;
  };
}

export const ElongatedParticlesSchema = SchemaFactory.createForClass(ElongatedParticles);
