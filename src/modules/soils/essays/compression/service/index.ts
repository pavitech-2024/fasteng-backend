import { Injectable } from '@nestjs/common';
import { CompressionRepository } from '../repository';
import { GeneralData_Compression_Service } from './general-data.compression.service';
import { Calc_Compression_Service } from './calc.compression.service';
import { CompressionInitDto } from '../dto/compression-init.dto';
import { Calc_Compression_Dto, Calc_Compression_Out } from '../dto/calc.compression.dto';
import { AlreadyExists } from 'utils/exceptions';

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

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateCompression(body: Calc_Compression_Dto) {
    try {
      return await this.calc_Service.calculateCompression(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_Compression_Dto & Calc_Compression_Out) {
    try {
      const {
        name,
        sample: { _id: sampleId },
        userId,
      } = body.generalData;

      // verifica se existe um ensaio de compressão com mesmo nome , sampleId e userId no banco de dados
      const alreadyExists = await this.compressionRepository.findOne({
        'generalData.name': name,
        'generalData.sample._id': sampleId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Compression with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const cbr = await this.compressionRepository.create(body);

      return { success: true, data: cbr };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}
