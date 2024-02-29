import { Module } from '@nestjs/common';
import { MarshallController } from './controller';
import { MarshallRepository } from './repository';
import { MarshallService } from './service';
import { GeneralData_Marshall_Service } from './service/general-data.marshall.service';
import { MaterialSelection_Marshall_Service } from './service/material-selection.marshall.service';
import { GranulometryComposition_Marshall_Service } from './service/granulometry-composition.marshall.service';

const services = [ 
  MarshallService, 
  GeneralData_Marshall_Service, 
  MaterialSelection_Marshall_Service, 
  GranulometryComposition_Marshall_Service 
];
@Module({
    imports: [],
    controllers: [MarshallController],
    providers: [...services, MarshallRepository],
    exports: [MarshallService, MarshallRepository],
  })
  export class MarshallModule {}