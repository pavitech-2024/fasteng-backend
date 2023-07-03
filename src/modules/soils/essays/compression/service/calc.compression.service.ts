import { Injectable, Logger } from "@nestjs/common";
import { CompressionRepository } from "../repository";
import { SamplesRepository } from "modules/soils/samples/repository";
import { Calc_Compression_Dto, Calc_Compression_Out } from "../dto/calc.compression.dto";


@Injectable()
export class Calc_Compression_Service {
  private logger = new Logger(Calc_Compression_Service.name);

  constructor(
    private readonly compressionRepository: CompressionRepository,
    private readonly sampleRepository: SamplesRepository
  ){}

  async calculateCompression({ step2Data }: Calc_Compression_Dto): Promise<{ success: boolean; result: Calc_Compression_Out }> {
    try {
      this.logger.log('calculate compression on calc.compression.service.ts > [body]');

      return {
        success: true,
        result: {}
      }
    } catch (error) {
      throw error;
    }
  }
}