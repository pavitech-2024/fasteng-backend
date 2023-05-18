import { Test, TestingModule } from '@nestjs/testing';
import { ReportErrorService } from './report-error.service';

describe('ReportErrorService', () => {
  let service: ReportErrorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportErrorService],
    }).compile();

    service = module.get<ReportErrorService>(ReportErrorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
