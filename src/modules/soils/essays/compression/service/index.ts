import { Injectable } from "@nestjs/common";
import { CompressionRepository } from "../repository";
import { GeneralData_Compression_Service } from "./general-data.compression.service";
import { Calc_Compression_Service } from "./calc.compression.service";
import { CompressionInitDto } from "../dto/compression-init.dto";


@Injectable()
export class CompressionService {
  constructor(
    private readonly generalData_Service: GeneralData_Compression_Service,
    private readonly calc_Service: Calc_Compression_Service,
    private readonly compressionRepository: CompressionRepository,
  ) {}

  async verifyInitCompression(body: CompressionInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitCompression(body);
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }
}