import { Module } from "@nestjs/common";
import { AsphaltGranulometryController } from "./controller";
import { AsphaltGranulometryRepository } from "./repository";
import { AsphaltGranulometryService } from "./service";
import { Calc_AsphaltGranulometry_Service } from "./service/calc.granulometry.service";
import { GeneralData_AsphaltGranulometry_Service } from "./service/general-data.granulometry.service";


const services = [AsphaltGranulometryService, GeneralData_AsphaltGranulometry_Service, Calc_AsphaltGranulometry_Service];

@Module({
  imports:[],
  controllers: [AsphaltGranulometryController],
  providers: [...services, AsphaltGranulometryRepository],
  exports: [AsphaltGranulometryService, AsphaltGranulometryRepository]
})
export class AsphaltGranulometryModule {}