import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SandSwelling } from '../schema';
import { SandSwellingService } from '../service';

@ApiTags('sandSwelling')
@Controller('concrete/essays/sand-swelling')
export class SandSwellingController {
  private logger = new Logger(SandSwellingController.name);

  constructor(
    private readonly sandSwelingService: SandSwellingService
  ){}
}
