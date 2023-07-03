import { Injectable, Logger } from "@nestjs/common";
import { CompressionRepository } from "../repository";
import { SamplesRepository } from "modules/soils/samples/repository";


@Injectable()
export class Calc_Compression_Service {
  private logger = new Logger(Calc_Compression_Service.name);

  constructor(
    private readonly compressionRepository: CompressionRepository,
    private readonly sampleRepository: SamplesRepository
  ){}
}