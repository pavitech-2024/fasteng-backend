import { Module } from "@nestjs/common";
import { AdhesionController } from "./controller";
import { AdhesionRepository } from "./repository";
import { AdhesionService } from "./service/adhesion.service";
import { GeneralData_Adhesion_Service } from "./service/general-data.adhesion.service";
import { Calc_Adhesion_Service } from "./service/calc.adhesion.service";

const services = [AdhesionService, GeneralData_Adhesion_Service, Calc_Adhesion_Service];

@Module({
  imports: [],
  controllers: [AdhesionController],
  providers: [...services, AdhesionRepository],
  exports: [AdhesionService, AdhesionRepository],
})
export class AdhesionModule {}