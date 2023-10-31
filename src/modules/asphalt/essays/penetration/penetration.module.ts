import { Module } from "@nestjs/common";
import { PenetrationController } from "./controller";
import { PenetrationService } from "./service";
import { GeneralData_Penetration_Service } from "./service/general-data.penetration.service";
import { PenetrationRepository } from "./repository";
import { Calc_Penetration_Service } from "./service/calc.penetration.service";

const services = [PenetrationService, GeneralData_Penetration_Service, Calc_Penetration_Service];

@Module({
  imports: [],
  controllers: [PenetrationController],
  providers: [...services, PenetrationRepository],
  exports: [PenetrationService, PenetrationRepository],
})
export class PenetrationModule {}