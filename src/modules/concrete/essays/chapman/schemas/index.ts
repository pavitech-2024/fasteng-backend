import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Material } from '../../../materials/schemas';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Calc_CHAPMAN_Out } from '../dto/calc.chapman.dto';

export type ChapmanDocument = HydratedDocument<Chapman>;

export type ChapmanGeneralData = {
  userId: string;
  name: string;
  material: Material;
};

type Chapman_step2Data = {
  displaced_volume: number;
};

@Schema({ collection: 'chapmans' })
export class Chapman {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: ChapmanGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: Chapman_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_CHAPMAN_Out;
  };
}

export const ChapmanSchema = SchemaFactory.createForClass(Chapman);
