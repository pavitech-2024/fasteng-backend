import { Injectable, Logger } from "@nestjs/common";
import { ElasticRecoveryRepository } from "../repository";
import { ElasticRecoveryInitDto } from "../dto/elasticRecovery-init.dto";
import { MaterialsRepository } from '../../../materials/repository';
import { NotFound, AlreadyExists } from "../../../../../utils/exceptions";

@Injectable()
export class GeneralData_ElasticRecovery_Service {
  private logger = new Logger(GeneralData_ElasticRecovery_Service.name);

  constructor(private readonly elasticRecoveryRepository: ElasticRecoveryRepository, private readonly materialRepository: MaterialsRepository) {}

  async verifyInitElasticRecovery({ name, material }: ElasticRecoveryInitDto) {
    try {
      this.logger.log('verify init elasticRecovery on general-data.elasticRecovery.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({ 
        "_id": material._id 
      });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of ElasticRecovery');

      // verificar se existe uma elasticRecovery com mesmo nome e materialId no banco de dados
      const elasticRecoveryExists = await this.elasticRecoveryRepository.findOne({ 
        "generalData.name": name,
        "generalData.material._id": material._id
      });

      // se existir, retorna erro
      if (elasticRecoveryExists) throw new AlreadyExists(`name`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}