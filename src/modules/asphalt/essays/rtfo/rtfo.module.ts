import { Module } from "@nestjs/common";
import { RtfoController } from "./controller";
import { RtfoRepository } from "./repository";
import { Calc_Rtfo_Service } from "./service/calc.rtfo.service";
import { GeneralData_Rtfo_Service } from "./service/general-data.rtfo.service";
import { RtfoService } from "./service/rtfo.service";

const services = [RtfoService, GeneralData_Rtfo_Service, Calc_Rtfo_Service];

@Module({
  imports: [],
  controllers: [RtfoController],
  providers: [...services, RtfoRepository],
  exports: [RtfoService, RtfoRepository],
})
export class RtfoModule {}