import { Module } from "@nestjs/common";
import { AdhesivenessController } from "./controller";
import { AdhesivenessRepository } from "./repository";
import { AdhesivenessService } from "./service/adhesiveness.service";
import { GeneralData_Adhesiveness_Service } from "./service/general-data.adhesiveness.service";
import { Calc_Adhesiveness_Service } from "./service/calc.adhesiveness.service";

const services = [AdhesivenessService, GeneralData_Adhesiveness_Service, Calc_Adhesiveness_Service];

@Module({
  imports: [],
  controllers: [AdhesivenessController],
  providers: [...services, AdhesivenessRepository],
  exports: [AdhesivenessService, AdhesivenessRepository],
})
export class AdhesivenessModule {}