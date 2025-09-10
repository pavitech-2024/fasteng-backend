// src/modules/pro-medina/fwd/controller/fwd-analysis.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { FwdAnalysisService } from '../service/fwd-analysis.service';
import { CreateFwdAnalysisDto } from '../dto/create-fwd-analysis.dto';

@Controller('fwd-analysis')
export class FwdAnalysisController {
  constructor(private readonly fwdAnalysisService: FwdAnalysisService) {}

  @Post('save')
  create(@Body() createFwdAnalysisDto: CreateFwdAnalysisDto) {
    return this.fwdAnalysisService.create(createFwdAnalysisDto);
  }

  @Get('all')
  findAll() {
    return this.fwdAnalysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fwdAnalysisService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFwdAnalysisDto: any) {
    return this.fwdAnalysisService.update(id, updateFwdAnalysisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fwdAnalysisService.remove(id);
  }

  @Post(':id/process')
  processAnalysis(@Param('id') id: string) {
    return this.fwdAnalysisService.processAnalysis(id);
  }
}