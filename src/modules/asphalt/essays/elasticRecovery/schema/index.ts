import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { HydratedDocument } from "mongoose";
import { Calc_ElasticRecovery_Out } from "../dto/calc-elasticRecovery.dto";

export type ElasticRecoveryDocument = HydratedDocument<ElasticRecovery>;

export type ElasticRecoveryGeneralData = {
  name: string
  material: Material
  userId: string
};

type elasticRecovery_Calc = {
  lengths: {
    id: number,
    stretching_lenght: number,
    juxtaposition_length: number,
  }[]
};


@Schema({ collection: 'elasticRecoverys' })
export class ElasticRecovery {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: ElasticRecoveryGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  elasticRecoveryCalc: elasticRecovery_Calc;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_ElasticRecovery_Out;
  };
}

export const ElasticRecoverySchema = SchemaFactory.createForClass(ElasticRecovery);