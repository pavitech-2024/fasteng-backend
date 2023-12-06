import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../../../modules/asphalt/materials/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_ViscosityRotational_Out } from '../dto/calc-viscosityRotational.dto';

export type ViscosityRotationalDocument = HydratedDocument<ViscosityRotational>;

export type ViscosityRotationalGeneralData = {
  userId: string;
  name: string;
  material: Material;
};

type ViscosityRotational_calc = {
  viscosityType: string;
  modified: boolean;
  dataPoints: [
    {
      temperature: number;
      viscosity: number;
    },
  ];
};

@Schema({ collection: 'viscosityRotational' })
export class ViscosityRotational {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: ViscosityRotationalGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  viscosityRotational: ViscosityRotational_calc;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_ViscosityRotational_Out;
  };
}

export const ViscosityRotationalSchema = SchemaFactory.createForClass(ViscosityRotational);
