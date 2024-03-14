import { Module } from '@nestjs/common';
import { ViscosityRotationalController } from './controller';
import { ViscosityRotationalRepository } from './repository';
import { Calc_ViscosityRotational_Service } from './service/calc.viscosityRotational.service';
import { GeneralData_ViscosityRotational_Service } from './service/general-data.viscosityRotational.service';
import { ViscosityRotationalService } from './service/viscosityRotational.service';
import { SetBinderTrial_Marshall_Service } from 'modules/asphalt/dosages/marshall/service/initial-binder-trial.service';
import { MarshallModule } from 'modules/asphalt/dosages/marshall/marshall.module';

const services = [
  ViscosityRotationalService,
  GeneralData_ViscosityRotational_Service,
  Calc_ViscosityRotational_Service,
  SetBinderTrial_Marshall_Service
];

@Module({
  imports: [MarshallModule],
  controllers: [ViscosityRotationalController],
  providers: [...services, ViscosityRotationalRepository],
  exports: [ViscosityRotationalService, ViscosityRotationalRepository],
})
export class ViscosityRotationalModule {}
