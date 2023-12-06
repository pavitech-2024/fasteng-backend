import { Module } from "@nestjs/common";
import { SandEquivalentRepository } from "./repository";
import { SandEquivalentController } from "./controller";
import { Calc_SandEquivalent_Service } from "./service/calc.sandEquivalent.service";
import { GeneralData_SandEquivalent_Service } from "./service/general-data.sandEquivalent.service";
import { SandEquivalentService } from "./service";

const services = [SandEquivalentService, GeneralData_SandEquivalent_Service, Calc_SandEquivalent_Service];

@Module({
  imports: [],
  controllers: [SandEquivalentController],
  providers: [...services, SandEquivalentRepository],
  exports: [SandEquivalentService, SandEquivalentRepository],
})
export class SandEquivalentModule {}