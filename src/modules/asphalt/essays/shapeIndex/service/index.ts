import { Injectable, Logger } from '@nestjs/common';
import { ShapeIndexInitDto } from '../dto/shapeIndex-init.dto';
import { Calc_SHAPEINDEX_Dto, Calc_SHAPEINDEX_Out } from '../dto/calc.shapeIndex.dto';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { ShapeIndexRepository } from '../repository';
import { Calc_SHAPEINDEX_Service } from './calc.shapeIndex.service';
import { GeneralData_SHAPEINDEX_Service } from './general-data.shapeIndex.service';

@Injectable()
export class ShapeIndexService {
  private logger = new Logger(ShapeIndexService.name);

  constructor(
    private readonly generalData_Service: GeneralData_SHAPEINDEX_Service,
    private readonly calc_Service: Calc_SHAPEINDEX_Service,
    private readonly ShapeIndex_Repository: ShapeIndexRepository,
  ) {}

  async verifyInitShapeIndex(body: ShapeIndexInitDto) {
    try {
      const result = await this.generalData_Service.verifyInitShapeIndex(body);

      return { result };
    } catch (error) {
      const { status, name, message } = error;
      return { result: { success: false}, error: { status, message, name } };
    }
  }

  async calculateShapeIndex(body: Calc_SHAPEINDEX_Dto) {
    try {
      return await this.calc_Service.calculateShapeIndex(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_SHAPEINDEX_Dto & Calc_SHAPEINDEX_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma shapeIndex com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.ShapeIndex_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`SHAPEINDEX with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const shapeIndex = await this.ShapeIndex_Repository.create(body);

      return { success: true, data: shapeIndex };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

}