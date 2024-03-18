import { IsNotEmpty } from "class-validator";
import { ElasticRecovery } from "../schema";

export class Calc_ElasticRecovery_Dto {
  @IsNotEmpty()
  generalData: ElasticRecovery['generalData'];

  @IsNotEmpty()
  elasticRecoveryCalc: ElasticRecovery['elasticRecoveryCalc'];
}

export interface Calc_ElasticRecovery_Out {
  elasticRecovery: number
}