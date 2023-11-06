import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { GranularLayersSamplesService } from '../service/granular-layers-samples.service';
import { CreateGranularLayersSampleDto } from '../dto/create-granular-layers-sample.dto';
import { UpdateGranularLayersSampleDto } from '../dto/update-granular-layers-sample.dto';

@Controller('granular-layers-samples')
export class GranularLayersSamplesController {
  private logger = new Logger(GranularLayersSamplesController.name);

  constructor(private readonly granularLayersSamplesService: GranularLayersSamplesService) {}

  @Post()
  create(@Body() createGranularLayersSampleDto: CreateGranularLayersSampleDto) {
    return this.granularLayersSamplesService.create(createGranularLayersSampleDto);
  }

  @Get()
  findAll() {
    return this.granularLayersSamplesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.granularLayersSamplesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGranularLayersSampleDto: UpdateGranularLayersSampleDto) {
    return this.granularLayersSamplesService.update(+id, updateGranularLayersSampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.granularLayersSamplesService.remove(+id);
  }
}
