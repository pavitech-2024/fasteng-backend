import { Injectable, Logger } from '@nestjs/common';
import { ShapeIndexRepository } from '../repository';
import { ShapeIndexInitDto } from '../dto/shapeindex-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
import { AlreadyExists } from '../../../../../utils/exceptions';
import { NotFound } from '../../../../../utils/exceptions';

@Injectable()
export class GeneralData_SHAPEINDEX_Service {
  private logger = new Logger(GeneralData_SHAPEINDEX_Service.name);

  constructor(private readonly shapeindexRepository: ShapeIndexRepository, private readonly materialRepository: MaterialsRepository) { }

  async verifyInitShapeIndex({ name, material }: ShapeIndexInitDto) {
    try {
      this.logger.log('verify init shapeindex on general-data.shapeIndex.service.ts > [body]');
      // verificar se existe uma amostra com mesmo nome e userId no banco de dados
      const materialExists = await this.materialRepository.findOne({
        "_id": material._id
      });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('material');

      // verificar se existe uma shapeindex com mesmo nome e materialId no banco de dados
      const shapeindexExists = await this.shapeindexRepository.findOne({
        "generalData.name": name,
        "generalData.material._id": material._id
      });

      // se existir, retorna erro
      if (shapeindexExists) throw new AlreadyExists(`name`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
