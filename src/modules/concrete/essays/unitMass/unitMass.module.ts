import { Module } from '@nestjs/common';
import { UnitMassController } from './controller';
import { UnitMassRepository } from './repository';
import { GeneralData_UnitMass_Service } from './service/general-data.unitMass.service';
import { UnitMassService } from './service/unitMass.service';

const services = [
  UnitMassService,
  GeneralData_UnitMass_Service, //Calc_UnitMass_Service
];

@Module({
  imports: [],
  controllers: [UnitMassController],
  providers: [...services, UnitMassRepository],
  exports: [UnitMassService, UnitMassRepository],
})
export class UnitMassModule {}
