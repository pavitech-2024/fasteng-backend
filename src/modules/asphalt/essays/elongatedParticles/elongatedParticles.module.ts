import { Module } from '@nestjs/common';
import { ElongatedParticlesController } from './controller';
import { ElongatedParticlesService } from './service/index';
import { ElongatedParticlesRepository } from './repository';
import { Calc_ELONGATEDPARTICLES_Service } from './service/calc.elongatedParticles.service';
import { GeneralData_ELONGATEDPARTICLES_Service } from './service/general-data.elongatedParticles.service';

const services = [ElongatedParticlesService, GeneralData_ELONGATEDPARTICLES_Service, Calc_ELONGATEDPARTICLES_Service];

@Module({
  imports: [],
  controllers: [ElongatedParticlesController],
  providers: [...services, ElongatedParticlesRepository],
  exports: [ElongatedParticlesService, ElongatedParticlesRepository],
})
export class ElongatedParticlesModule {}