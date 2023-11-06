import { Injectable, Logger } from '@nestjs/common';
import { CreateGranularLayersSampleDto } from '../dto/create-granular-layers-sample.dto';
import { UpdateGranularLayersSampleDto } from '../dto/update-granular-layers-sample.dto';
import { GranularLayers_SamplesRepository } from '../repository';

@Injectable()
export class GranularLayersSamplesService {
  private logger = new Logger(GranularLayersSamplesService.name);

  constructor(private readonly granularLayers_SamplesRepository: GranularLayers_SamplesRepository) {}

  create(createGranularLayersSampleDto: CreateGranularLayersSampleDto) {
    return 'This action adds a new granularLayersSample';
  }

  findAll() {
    return `This action returns all granularLayersSamples`;
  }

  findOne(id: number) {
    return `This action returns a #${id} granularLayersSample`;
  }

  update(id: number, updateGranularLayersSampleDto: UpdateGranularLayersSampleDto) {
    return `This action updates a #${id} granularLayersSample`;
  }

  remove(id: number) {
    return `This action removes a #${id} granularLayersSample`;
  }
}
