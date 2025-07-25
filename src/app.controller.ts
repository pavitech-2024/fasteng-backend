import { Controller, Get } from '@nestjs/common';
import { AppService } from 'app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  async heathCheck() {
    const result = await this.appService.healthCheck();
    return result;
  }
}
