import { Module } from "@nestjs/common";
import { SayboltFurolController } from "./controller";
import { SayboltFurolRepository } from "./repository";
import { Calc_SayboltFurol_Service } from "./service/calc.sayboltFurol.service";
import { GeneralData_SayboltFurol_Service } from "./service/general-data.sayboltFurol.service";
import { SayboltFurolService } from "./service";

const services = [SayboltFurolService, GeneralData_SayboltFurol_Service, Calc_SayboltFurol_Service];

@Module({
  imports: [],
  controllers: [SayboltFurolController],
  providers: [...services, SayboltFurolRepository],
  exports: [SayboltFurolService, SayboltFurolRepository],
})
export class SayboltFurolModule {}