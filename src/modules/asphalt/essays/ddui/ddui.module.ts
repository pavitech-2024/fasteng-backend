import { Module } from "@nestjs/common";
import { DduiController } from "./controller";
import { DduiRepository } from "./repository";
import { Calc_Ddui_Service } from "./service/calc-ddui.service";
import { DduiService } from "./service/ddui.service";
import { GeneralData_Ddui_Service } from "./service/general-data.ddui.service";

const services = [DduiService, GeneralData_Ddui_Service, Calc_Ddui_Service];

@Module({
  imports: [],
  controllers: [DduiController],
  providers: [...services, DduiRepository],
  exports: [DduiService, DduiRepository],
})
export class DduiModule {}