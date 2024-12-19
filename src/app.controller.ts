import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AppService } from 'app.service';

@Controller()
export class AppController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly appService: AppService) {}

  @Get()
  async heathCheck() {
    const result = await this.appService.healthCheck();
    return result;
  }
}
