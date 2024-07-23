import { Module } from "@nestjs/common/decorators/modules";
import { ConcreteRcController } from "./controller";
import { ConcreteRCRepository } from "./respository";
import { ConcreteRcService } from "./service";
import { Calc_CONCRETERC_Service } from "./service/calc.rc.service";
import { GeneralData_CONCRETERC_Service } from "./service/general-data.rc.service";

const services = [ConcreteRcService, GeneralData_CONCRETERC_Service, Calc_CONCRETERC_Service];

@Module({
  imports: [],
  controllers: [ConcreteRcController],
  providers: [...services, ConcreteRCRepository],
  exports: [ConcreteRcService, ConcreteRCRepository],
})
export class ConcreteRcModule {}