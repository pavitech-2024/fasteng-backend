import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { FwdService } from '../services/fwd.service';
import { CreateFwdAnalysisDto } from '../dto/create.fwd.dto';

@Controller('fwd-analysis')
export class FwdAnalysisController {
  constructor(private readonly FwdService: FwdService) {}

  @Post('save')
  create(@Body() createFwdAnalysisDto: CreateFwdAnalysisDto) {
    return this.FwdService.create(createFwdAnalysisDto);
  }

  @Get('all')
  findAll() {
    console.log('teste');
    return this.FwdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.FwdService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFwdAnalysisDto: any) {
    return this.FwdService.update(id, updateFwdAnalysisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.FwdService.remove(id);
  }

  @Post(':id/process')
  processAnalysis(@Param('id') id: string) {
    return this.FwdService.processAnalysis(id);
  }
}
