import { Module } from '@nestjs/common';
import { ABCPController } from './controller';
import { ABCPRepository } from './repository';
import { ABCPService } from './service';
import { GeneralData_ABCP_Service } from './service/general-data.abcp.service';
import { MaterialSelection_ABCP_Service } from './service/material-selection.abcp.service';
import { EssaySelection_ABCP_Service } from './service/essay-selection.abcp.service';

const services = [ABCPService, GeneralData_ABCP_Service, MaterialSelection_ABCP_Service, EssaySelection_ABCP_Service];
@Module({
    imports: [],
    controllers: [ABCPController],
    providers: [...services, ABCPRepository],
    exports: [ABCPService, ABCPRepository],
  })
  export class ABCPModule {}