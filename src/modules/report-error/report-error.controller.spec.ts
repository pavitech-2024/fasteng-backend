import { Test, TestingModule } from '@nestjs/testing';
import { ReportErrorController } from './report-error.controller';

describe('ReportErrorController', () => {
  let controller: ReportErrorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportErrorController],
    }).compile();

    controller = module.get<ReportErrorController>(ReportErrorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
