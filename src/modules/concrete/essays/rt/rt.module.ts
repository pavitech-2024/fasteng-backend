import { Module } from "@nestjs/common";
import { ConcreteRtController } from "./controller";
import { ConcreteRtRepository } from "./repository";
import { ConcreteRtService } from "./service";
import { Calc_CONCRETERT_Service } from "./service/calc.rt.service";
import { GeneralData_CONCRETERT_Service } from "./service/general-data.rt.service";

const services = [ConcreteRtService, GeneralData_CONCRETERT_Service, Calc_CONCRETERT_Service];

@Module({
  imports: [],
  controllers: [ConcreteRtController],
  providers: [...services, ConcreteRtRepository],
  exports: [ConcreteRtService, ConcreteRtRepository],
})
export class ConcreteRtModule {}