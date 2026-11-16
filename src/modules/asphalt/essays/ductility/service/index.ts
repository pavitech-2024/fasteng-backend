import { Injectable } from '@nestjs/common';
import { DuctilityInitDto } from '../dto/ductility-init.dto';
import { Calc_DUCTILITY_Dto, Calc_DUCTILITY_Out } from '../dto/calc.ductility.dto';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { DuctilityRepository } from '../repository';
import { Calc_DUCTILITY_Service } from './calc.ductility.service';
import { GeneralData_DUCTILITY_Service } from './general-data.ductility.service';

@Injectable()
export class DuctilityService {
  constructor(
    private readonly generalData_Service: GeneralData_DUCTILITY_Service,
    private readonly calc_Service: Calc_DUCTILITY_Service,
    private readonly Ductility_Repository: DuctilityRepository,
  ) {}

  async verifyInitDuctility(body: DuctilityInitDto) {
    try {
      const result = await this.generalData_Service.verifyInitDuctility(body);
      return { result };
    } catch (error) {
      const { status, name, message } = error;
      return { result: { success: false}, error: { status, message, name } };
    }
  }

  async calculateDuctility(body: Calc_DUCTILITY_Dto) {
    try {
      return await this.calc_Service.calculateDuctility(body);
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_DUCTILITY_Dto & Calc_DUCTILITY_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      const alreadyExists = await this.Ductility_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      if (alreadyExists) throw new AlreadyExists(`DUCTILITY with name "${name}" from user "${userId}"`);

      const ductility = await this.Ductility_Repository.create(body);

      return { success: true, data: ductility };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async getAllEssaysByUser(userId: string) {
    try {
      const essays = await this.Ductility_Repository.find({
        'generalData.userId': userId
      });
      return essays;
    } catch (error) {
      throw error;
    }
  }

  async getAllEssaysByMaterial(materialId: string) {
    try {
      const essays = await this.Ductility_Repository.find({
        'generalData.material._id': materialId
      });
      return essays;
    } catch (error) {
      throw error;
    }
  }

  async getAllEssays() {
    try {
      const essays = await this.Ductility_Repository.findAll();
      return essays;
    } catch (error) {
      throw error;
    }
  }

  async getEssayById(id: string) {
    try {
      const essay = await this.Ductility_Repository.findOne({ _id: id });
      return essay;
    } catch (error) {
      throw error;
    }
  }
}