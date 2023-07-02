import { Controller, Logger } from "@nestjs/common";
import { CompressionService } from "../service";


@Controller('soils/essays/compression')
export class CompressionController {
  private logger = new Logger(CompressionController.name);

  constructor(private readonly compressionService: CompressionService) {}
}