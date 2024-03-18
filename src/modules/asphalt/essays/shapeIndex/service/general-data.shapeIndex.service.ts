import { Injectable, Logger } from '@nestjs/common';
import { ShapeIndexRepository } from '../repository';
import { ShapeIndexInitDto } from '../dto/shapeIndex-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { NotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_SHAPEINDEX_Service {
  private logger = new Logger(GeneralData_SHAPEINDEX_Service.name);

  constructor(private readonly shapeIndexRepository: ShapeIndexRepository, private readonly materialRepository: MaterialsRepository) { }

  async verifyInitShapeIndex({ name, material }: ShapeIndexInitDto) {
    try {
      this.logger.log('verify init shapeIndex on general-data.shapeIndex.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({
        "_id": material._id
      });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('material');

      // verificar se existe uma shapeIndex com mesmo nome e materialId no banco de dados
      const shapeIndexExists = await this.shapeIndexRepository.findOne({
        "generalData.name": name,
        "generalData.material._id": material._id
      });

      // se existir, retorna erro
      if (shapeIndexExists) throw new AlreadyExists(`name`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
