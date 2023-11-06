import { PartialType } from '@nestjs/swagger';
import { CreateGranularLayersSampleDto } from './create-granular-layers-sample.dto';

export class UpdateGranularLayersSampleDto extends PartialType(CreateGranularLayersSampleDto) {}
