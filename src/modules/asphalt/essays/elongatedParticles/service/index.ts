import { Injectable, Logger } from '@nestjs/common';
import { ElongatedParticlesInitDto } from '../dto/elongatedParticles-init.dto';
import { Calc_ELONGATEDPARTICLES_Dto, Calc_ELONGATEDPARTICLES_Out } from '../dto/calc.elongatedParticles.dto';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { ElongatedParticlesRepository } from '../repository';
import { Calc_ELONGATEDPARTICLES_Service } from './calc.elongatedParticles.service';
import { GeneralData_ELONGATEDPARTICLES_Service } from './general-data.elongatedParticles.service';

@Injectable()
export class ElongatedParticlesService {
  private logger = new Logger(ElongatedParticlesService.name);

  constructor(
    private readonly generalData_Service: GeneralData_ELONGATEDPARTICLES_Service,
    private readonly calc_Service: Calc_ELONGATEDPARTICLES_Service,
    private readonly ElongatedParticles_Repository: ElongatedParticlesRepository,
  ) {}

  async verifyInitElongatedParticles(body: ElongatedParticlesInitDto) {
    try {
      const result = await this.generalData_Service.verifyInitElongatedParticles(body);

      return { result };
    } catch (error) {
      const { status, name, message } = error;
      return { result: { success: false}, error: { status, message, name } };
    }
  }

  async calculateElongatedParticles(body: Calc_ELONGATEDPARTICLES_Dto) {
    try {
      return await this.calc_Service.calculateElongatedParticles(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_ELONGATEDPARTICLES_Dto & Calc_ELONGATEDPARTICLES_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma elongatedparticles com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.ElongatedParticles_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`ELONGATEDPARTICLES with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const elongatedparticles = await this.ElongatedParticles_Repository.create(body);

      return { success: true, data: elongatedparticles };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}