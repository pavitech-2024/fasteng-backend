import { Injectable, Logger } from '@nestjs/common';
import { ElongatedParticlesRepository } from '../repository';
import { ElongatedParticlesInitDto } from '../dto/elongatedParticles-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
import { AlreadyExists, NotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_ELONGATEDPARTICLES_Service {
  private logger = new Logger(GeneralData_ELONGATEDPARTICLES_Service.name);

  constructor(private readonly elongatedParticlesRepository: ElongatedParticlesRepository, private readonly materialRepository: MaterialsRepository) { }

  async verifyInitElongatedParticles({ name, material }: ElongatedParticlesInitDto) {
    try {
      this.logger.log('verify init elongatedParticles on general-data.elongatedParticles.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({
        "_id": material._id
      });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('material');

      // verificar se existe uma elongatedParticles com mesmo nome e materialId no banco de dados
      const elongatedParticlesExists = await this.elongatedParticlesRepository.findOne({
        "generalData.name": name,
        "generalData.material._id": material._id
      });

      // se existir, retorna erro
      if (elongatedParticlesExists) throw new AlreadyExists(`name`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
