import { Module } from "@nestjs/common";
import { SofteningPointController } from "./controller";
import { SofteningPointRepository } from "./repository";
import { Calc_SofteningPoint_Service } from "./service/calc-softeningPoint.softeningPoint.service";
import { GeneralData_SofteningPoint_Service } from "./service/general-data.softeningPoint.service";
import { SofteningPointService } from "./service/softeningPoint.service";

const services = [SofteningPointService, GeneralData_SofteningPoint_Service, Calc_SofteningPoint_Service];

@Module({
  imports: [],
  controllers: [SofteningPointController],
  providers: [...services, SofteningPointRepository],
  exports: [SofteningPointService, SofteningPointRepository],
})
export class SofteningPointModule {}