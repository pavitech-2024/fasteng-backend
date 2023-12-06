import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Material } from '../../../materials/schemas';
import { Calc_DUCTILITY_Out } from '../dto/calc.ductility.dto';
import { IsNotEmpty } from 'class-validator';

export type DuctilityDocument = HydratedDocument<Ductility>;

export type DuctilityGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};

type Ductility_step2Data = {
    first_rupture_length: number;
    second_rupture_length: number;
    third_rupture_length: number;
};

@Schema({ collection: 'ductilitys' })
export class Ductility {
    _id: string;

    @IsNotEmpty()
    @Prop({ type: Object })
    generalData: DuctilityGeneralData;

    @IsNotEmpty()
    @Prop({ type: Object })
    step2Data: Ductility_step2Data;

    @IsNotEmpty()
    @Prop({ type: Object })
    results: {
        data: Calc_DUCTILITY_Out;
    };
}

export const DuctilitySchema = SchemaFactory.createForClass(Ductility);
