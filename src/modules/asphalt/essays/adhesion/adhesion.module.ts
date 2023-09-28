import { Module } from "@nestjs/common";
import { Calc_CHAPMAN_Service } from "modules/concrete/essays/chapman/service/calc.chapman.service";
import { AdhesionController } from "./controller";
import { AdhesionRepository } from "./repository";
import { AdhesionService } from "./service/adhesion.service";
import { GeneralData_Adhesion_Service } from "./service/general-data.adhesion.service";

const services = [AdhesionService, GeneralData_Adhesion_Service, Calc_CHAPMAN_Service];

@Module({
  imports: [],
  controllers: [AdhesionController],
  providers: [...services, AdhesionRepository],
  exports: [AdhesionService, AdhesionRepository],
})
export class AdhesionModule {}