import { Module } from '@nestjs/common';
import { ABCPController } from './controller';
import { ABCPRepository } from './repository';
import { ABCPService } from './service';
import { GeneralData_ABCP_Service } from './service/general-data.abcp.service';

const services = [ABCPService, GeneralData_ABCP_Service];
@Module({
    imports: [],
    controllers: [ABCPController],
    providers: [...services, ABCPRepository],
    exports: [ABCPService, ABCPRepository],
  })
  export class ABCPModule {}