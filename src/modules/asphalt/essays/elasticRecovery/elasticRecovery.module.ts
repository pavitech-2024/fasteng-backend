import { Module } from "@nestjs/common";
import { ElasticRecoveryController } from "./controller";
import { ElasticRecoveryRepository } from "./repository";
import { ElasticRecoveryService } from "./service";
import { Calc_ElasticRecovery_Service } from "./service/calc.elasticRecovery.service";
import { GeneralData_ElasticRecovery_Service } from "./service/general-data.elasticRecovery.service";

const services = [ElasticRecoveryService, GeneralData_ElasticRecovery_Service, Calc_ElasticRecovery_Service];

@Module({
  imports: [],
  controllers: [ElasticRecoveryController],
  providers: [...services, ElasticRecoveryRepository],
  exports: [ElasticRecoveryService, ElasticRecoveryRepository],
})
export class ElasticRecoveryModule {}