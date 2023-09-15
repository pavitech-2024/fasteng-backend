import { Module } from '@nestjs/common';
import { UnitMassController } from './controller';
import { UnitMassRepository } from './repository';
import { GeneralData_UnitMass_Service } from './service/general-data.unitMass.service';
import { UnitMassService } from './service';
import { step2Data_Service } from './service/step2Data.unitMass.service';
import { Result_UnitMass_Service } from './service/result.unitMass.service';

const services = [UnitMassService, GeneralData_UnitMass_Service, step2Data_Service, Result_UnitMass_Service];

@Module({
  imports: [],
  controllers: [UnitMassController],
  providers: [...services, UnitMassRepository],
  exports: [UnitMassService, UnitMassRepository],
})
export class UnitMassModule {}
