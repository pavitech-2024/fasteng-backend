import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Sieve } from 'utils/interfaces';

export type MaterialDocument = HydratedDocument<Material>;

@Schema({ collection: 'materials' })
export class Material {
  _id: string;

  @IsNotEmpty()
  @Prop()
  name: string;

  @IsNotEmpty()
  @Prop()
  type: 'coarseAggregate' | 'fineAggregate' | 'concrete';

  @IsNotEmpty()
  @Prop()
  userId: string;

  @IsNotEmpty()
  @Prop()
  createdAt: Date;

  @Prop({ type: Object })
  description?: {
    source?: string;
    responsible?: string;
    maxDiammeter?: Sieve;
    aggregateNature?: string;
    boughtDate?: string;
    recieveDate?: string;
    extractionDate?: string;
    collectionDate?: string;
    // classification_CAP?: 'CAP 30/45' | 'CAP 50/70' | 'CAP 85/100' | 'CAP 150/200'; // for CAP
    // classification_AMP?: 'AMP 50/65' | 'AMP 55/75' | 'AMP 60/85' | 'AMP 65/90'; // for AMP
    observation?: string;
  };
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
