import { Module } from '@nestjs/common';
import { SuperpaveController } from './controller';
import { SuperpaveRepository } from './repository';
import { SuperpaveService } from './service';
import { GeneralData_Superpave_Service } from './service/general-data.superpave.service';
import { MaterialSelection_Superpave_Service } from './service/material-selection.superpave.service';
import { GranulometryComposition_Superpave_Service } from './service/granulometry-composition.superpave.service';
import { InitialBinder_Superpave_Service } from './service/initial-binder.superpave.service';
import { FirstCompression_Superpave_Service } from './service/first-compression.service';
import { FirstCurvePercentages_Service } from './service/first-curve-percentages.service';
import { ChosenCurvePercentages_Superpave_Service } from './service/chosen-curves-percentages.service';
import { SecondCompression_Superpave_Service } from './service/second-compression.superpave.service';
import { SecondCompressionParameters_Superpave_Service } from './service/second-compression-parameters.service';
import { ResumeDosage_Superpave_Service } from './service/resume-dosage.service';
import { GranulometryEssay_Superpave_Service } from './service/granulometryEssay.service';

const services = [
  SuperpaveService,
  GeneralData_Superpave_Service,
  MaterialSelection_Superpave_Service,
  GranulometryEssay_Superpave_Service,
  GranulometryComposition_Superpave_Service,
  InitialBinder_Superpave_Service,
  FirstCompression_Superpave_Service,
  FirstCurvePercentages_Service,
  ChosenCurvePercentages_Superpave_Service,
  SecondCompression_Superpave_Service,
  SecondCompressionParameters_Superpave_Service,
  ResumeDosage_Superpave_Service
];

@Module({
    imports: [],
    controllers: [SuperpaveController],
    providers: [...services, SuperpaveRepository],
    exports: [SuperpaveService, SuperpaveRepository],
  })
  export class SuperpaveModule {}
