import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IggAnalysis, IggAnalysisSchema } from './schema/igg-analysis.schema';
import { IggAnalysisService } from './service/igg-analysis.service';
import { IggAnalysisController } from './controller/igg-analysis.controller';
import { IggAnalysisRepository } from './repository/igg-analysis.repository';
import { DATABASE_CONNECTION } from '../../../infra/mongoose/database.config';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: IggAnalysis.name, schema: IggAnalysisSchema }],
      DATABASE_CONNECTION.PROMEDINA,
    ),
  ],
  controllers: [IggAnalysisController],
  providers: [IggAnalysisService, IggAnalysisRepository],
  exports: [IggAnalysisService],
})
export class IggModule {}