import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Material } from '../../../materials/schemas';
import { Calc_ANGULARITY_Out } from '../dto/calc.angularity.dto';
import { IsNotEmpty } from 'class-validator';

export type AngularityDocument = HydratedDocument<Angularity>;

export type AngularityGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};

export type row_step2 = {
    diameter?: string;
    determination: string;
    cylinder_mass: number;
    cylinder_mass_plus_sample: number;
}

type Angularity_step2Data = {
    relative_density: number;
    cylinder_volume: number;
    method: 'A' | 'B' | 'C';
    determinations: row_step2[];
};

@Schema({ collection: 'angularitys' })
export class Angularity {
    _id: string;

    @IsNotEmpty()
    @Prop({ type: Object })
    generalData: AngularityGeneralData;

    @IsNotEmpty()
    @Prop({ type: Object })
    step2Data: Angularity_step2Data;

    @IsNotEmpty()
    @Prop({ type: Object })
    results: {
        data: Calc_ANGULARITY_Out;
    };
}

export const AngularitySchema = SchemaFactory.createForClass(Angularity);
