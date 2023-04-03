import { Controller, Logger } from '@nestjs/common';
import { SamplesService } from '../service';

@Controller('soils/samples')
export class SamplesController {
  private logger = new Logger(SamplesController.name);

  constructor(private readonly samplesService: SamplesService) {}
}
