import { Module } from '@nestjs/common';
import { ReportErrorController } from './report-error.controller';
import { ReportErrorService } from './report-error.service';

@Module({
  imports: [],
  controllers: [ReportErrorController],
  providers: [ReportErrorService],
  exports: [ReportErrorService],
})
export class ReportErrorModule {}
