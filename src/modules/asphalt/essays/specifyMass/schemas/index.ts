import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Material } from '../../../materials/schemas';
import { Calc_SPECIFYMASS_Out } from '../dto/calc.specifyMass.dto';
import { IsNotEmpty } from 'class-validator';

export type SpecifyMassDocument = HydratedDocument<SpecifyMass>;

export type SpecifyMassGeneralData = {
  userId: string;
  name: string;
  material: Material;
  createdAt: Date;
  operator?: string;
  calculist?: string;
  description?: string;
};

type SpecifyMass_step2Data = {
  dry_mass: number;
  submerged_mass: number;
  surface_saturated_mass: number;
};

@Schema({ collection: 'specifyMasss' })
export class SpecifyMass {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: SpecifyMassGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: SpecifyMass_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_SPECIFYMASS_Out;
  };
}

export const SpecifyMassSchema = SchemaFactory.createForClass(SpecifyMass);
