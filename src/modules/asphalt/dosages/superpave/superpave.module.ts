import { Module } from '@nestjs/common';
import { SuperpaveController } from './controller';
import { SuperpaveRepository } from './repository';
import { SuperpaveService } from './service';
import { GeneralData_Superpave_Service } from './service/general-data.superpave.service';
import { MaterialSelection_Superpave_Service } from './service/material-selection.superpave.service';
import { GranulometryComposition_Superpave_Service } from './service/granulometry-composition.superpave.service';
import { InitialBinder_Superpave_Service } from './service/initial-binder.superpave.service';

const services = [
  SuperpaveService,
  GeneralData_Superpave_Service,
  MaterialSelection_Superpave_Service,
  GranulometryComposition_Superpave_Service,
  InitialBinder_Superpave_Service
];

@Module({
    imports: [],
    controllers: [SuperpaveController],
    providers: [...services, SuperpaveRepository],
    exports: [SuperpaveService, SuperpaveRepository],
  })
  export class SuperpaveModule {}
