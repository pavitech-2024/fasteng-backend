  import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FwdAnalysis, FwdAnalysisSchema } from '../fwd/schema/fwd.schema';
import { FwdService } from '../fwd/services/fwd.service';
import { FwdAnalysisController } from '../fwd/controller/fwd.controller';
import { FwdRepository } from '../fwd/repository/fwd.repository';
import { DATABASE_CONNECTION } from '../../../../infra/mongoose/database.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FwdAnalysis.name, schema: FwdAnalysisSchema }], DATABASE_CONNECTION.ASPHALT),
  ],
  controllers: [FwdAnalysisController],
  providers: [FwdService, FwdRepository],
  exports: [FwdService, FwdRepository],
})
export class FwdModule {}
