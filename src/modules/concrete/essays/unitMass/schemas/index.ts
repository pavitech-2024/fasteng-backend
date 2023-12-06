import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../../../modules/asphalt/materials/schemas';
import { HydratedDocument } from 'mongoose';

export type UnitMassDocument = HydratedDocument<UnitMass>;

export type UnitMassGeneralData = {
  userId: string;
  experimentName: string;
  material: Material;
  method: string;
};

type UnitMass_step2Data = {
  containerVolume: number;
  containerWeight: number;
  sampleContainerWeight: number;
};

type UnitMass_Result = {
  result: number;
};

@Schema({ collection: 'unitMass' })
export class UnitMass {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: UnitMassGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  step2Data: UnitMass_step2Data;

  @IsNotEmpty()
  @Prop({ type: Object })
  result: {
    result: UnitMass_Result;
  };
}

export const UnitMassSchema = SchemaFactory.createForClass(UnitMass);
