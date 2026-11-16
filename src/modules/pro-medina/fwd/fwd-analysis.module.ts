// src/modules/pro-medina/fwd/fwd.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FwdAnalysis, FwdAnalysisSchema } from './schemas/fwd-analysis.schema';
import { FwdAnalysisService } from './service/fwd-analysis.service';
import { FwdAnalysisController } from './controllers/fwd-analysis.controller';
import { FwdAnalysisRepository } from './repository/fwd-analysis.repository';
import { DATABASE_CONNECTION } from '../../../infra/mongoose/database.config';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: FwdAnalysis.name, schema: FwdAnalysisSchema },
      ],
      DATABASE_CONNECTION.PROMEDINA // Use a conexão promedina
    ),
  ],
  controllers: [FwdAnalysisController],
  providers: [FwdAnalysisService, FwdAnalysisRepository],
  exports: [FwdAnalysisService],
})
export class FwdModule {}