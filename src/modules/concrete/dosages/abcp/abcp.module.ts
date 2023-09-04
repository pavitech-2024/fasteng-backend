import { Module } from '@nestjs/common';
import { ABCPController } from './controller';
import { ABCPRepository } from './repository';
import { ABCPService } from './service';
import { GeneralData_ABCP_Service } from './service/general-data.abcp.service';
import { MaterialSelection_ABCP_Service } from './service/material-selection.abcp.service';
import { ConcreteGranulometryService } from 'modules/concrete/essays/granulometry/service';
import { UnitMassService } from 'modules/concrete/essays/unitMass/service';

const services = [ABCPService, GeneralData_ABCP_Service, MaterialSelection_ABCP_Service];
@Module({
    imports: [],
    controllers: [ABCPController],
    providers: [...services, ABCPRepository],
    exports: [ABCPService, ABCPRepository],
  })
  export class ABCPModule {}