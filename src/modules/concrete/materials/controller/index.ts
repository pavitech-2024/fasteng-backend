import { Controller, Logger } from '@nestjs/common';
import { MaterialsService } from '../service';

@Controller('concrete/materials')
export class MaterialsController {
  private logger = new Logger(MaterialsController.name);

  constructor(private readonly materialsService: MaterialsService) {}
}
