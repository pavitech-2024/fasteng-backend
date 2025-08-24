import { Module } from '@nestjs/common';
import { MarshallController } from './controller';
import { MarshallRepository } from './repository';
import { MarshallService } from './service';
import { GeneralData_Marshall_Service } from './service/general-data.marshall.service';
import { MaterialSelection_Marshall_Service } from './service/material-selection.marshall.service';
import { GranulometryComposition_Marshall_Service } from './service/granulometry-composition.marshall.service';
import { SetBinderTrial_Marshall_Service } from './service/initial-binder-trial.service';
import { MaximumMixtureDensity_Marshall_Service } from './service/maximumMixtureDensity.service';
import { VolumetricParameters_Marshall_Service } from './service/volumetric-parameters.service';
import { OptimumBinderContent_Marshall_Service } from './service/optimum-binder.marshall.service';
import { ConfirmCompression_Marshall_Service } from './service/confirm-compression.marshall.service';
import { BaseMarshallService } from './service/base.marshall.service';

const services = [ 
  MarshallService, 
  GeneralData_Marshall_Service, 
  MaterialSelection_Marshall_Service, 
  GranulometryComposition_Marshall_Service,
  SetBinderTrial_Marshall_Service,
  MaximumMixtureDensity_Marshall_Service,
  VolumetricParameters_Marshall_Service,
  OptimumBinderContent_Marshall_Service,
  ConfirmCompression_Marshall_Service,
  BaseMarshallService
];
@Module({
    imports: [],
    controllers: [MarshallController],
    providers: [...services, MarshallRepository],
    exports: [MarshallService, MarshallRepository],
  })
  export class MarshallModule {}