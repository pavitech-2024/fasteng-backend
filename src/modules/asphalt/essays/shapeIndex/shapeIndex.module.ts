import { Module } from '@nestjs/common';
import { ShapeIndexController } from './controller';
import { ShapeIndexService } from './service/index';
import { ShapeIndexRepository } from './repository';
import { Calc_SHAPEINDEX_Service } from './service/calc.shapeIndex.service';
import { GeneralData_SHAPEINDEX_Service } from './service/general-data.shapeIndex.service';

const services = [ShapeIndexService, GeneralData_SHAPEINDEX_Service, Calc_SHAPEINDEX_Service];

@Module({
  imports: [],
  controllers: [ShapeIndexController],
  providers: [...services, ShapeIndexRepository],
  exports: [ShapeIndexService, ShapeIndexRepository],
})
export class ShapeIndexModule {}
