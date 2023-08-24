import { Module } from '@nestjs/common';
import { CompressionController } from './controller';
import { CompressionRepository } from './repository';
import { GeneralData_Compression_Service } from './service/general-data.compression.service';
import { CompressionService } from './service';
import { Calc_Compression_Service } from './service/calc.compression.service';

const services = [CompressionService, GeneralData_Compression_Service, Calc_Compression_Service];

@Module({
  imports: [],
  controllers: [CompressionController],
  providers: [...services, CompressionRepository],
  exports: [CompressionService, CompressionRepository],
})
export class CompressionModule {}
