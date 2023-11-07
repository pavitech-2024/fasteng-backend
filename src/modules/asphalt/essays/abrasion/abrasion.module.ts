import { Module } from "@nestjs/common";
import { AbrasionController } from "./controller";
import { AbrasionRepository } from "./repository";
import { AbrasionService } from "./service";
import { Calc_Abrasion_Service } from "./service/calc.abrasion.service";
import { GeneralData_Abrasion_Service } from "./service/general-data.abrasion.service";

const services = [AbrasionService, GeneralData_Abrasion_Service, Calc_Abrasion_Service];

@Module({
  imports: [],
  controllers: [AbrasionController],
  providers: [...services, AbrasionRepository],
  exports: [AbrasionService, AbrasionRepository],
})
export class AbrasionModule {}