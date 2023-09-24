import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Sieve } from '../../../../utils/interfaces';

export type MaterialDocument = HydratedDocument<Material>;

@Schema({ collection: 'materials' })
export class Material {
  _id: string;

  @IsNotEmpty()
  @Prop()
  name: string;

  @IsNotEmpty()
  @Prop()
  type: 'coarseAggregate' | 'fineAggregate' | 'filler' | 'asphaltBinder' | 'CAP' | 'other';

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
    classification_CAP?: 'CAP 30/45' | 'CAP 50/70' | 'CAP 85/100' | 'CAP 150/200'; // for CAP
    classification_AMP?: 'AMP 50/65' | 'AMP 55/75' | 'AMP 60/85' | 'AMP 65/90'; // for AMP
    observation?: string;
  };

  @Prop({ type: Map, of: Object })
  patternExperiments: Map<string, any>;

  @Prop()
  indexOfSusceptibility?: number;

  getLastExperimentId(isPenetration: boolean): { catch: boolean; experiment?: any } {
    if (!isPenetration && this.patternExperiments.has('Softening Point')) {
      return { catch: true, experiment: this.patternExperiments.get('Softening Point') };
    } else if (isPenetration && this.patternExperiments.has('Penetration')) {
      return { catch: true, experiment: this.patternExperiments.get('Penetration') };
    }
    return { catch: false };
  }

  // Método para calcular o índice de susceptibilidade e atualizá-lo no próprio objeto Material
  async setIndexOfSusceptibility(softeningPoint: number, penetration: number): Promise<void> {
    if (
      this.description?.classification_CAP === 'CAP 30/45' ||
      this.description?.classification_CAP === 'CAP 50/70' ||
      this.description?.classification_CAP === 'CAP 85/100' ||
      this.description?.classification_CAP === 'CAP 150/200'
    ) {
      // Implemente a lógica de cálculo do índice de susceptibilidade aqui
      const indexOfSusceptibility = (softeningPoint + penetration) / 2;

      // Atualize o índice de susceptibilidade no objeto Material
      this.indexOfSusceptibility = indexOfSusceptibility ;
    }
  }
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
