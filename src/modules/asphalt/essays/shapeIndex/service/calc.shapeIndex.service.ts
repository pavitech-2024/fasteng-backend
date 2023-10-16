import { Injectable, Logger } from '@nestjs/common';
import { Calc_SHAPEINDEX_Dto, Calc_SHAPEINDEX_Out } from '../dto/calc.shapeindex.dto';
import { ShapeIndexRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';

@Injectable()
export class Calc_SHAPEINDEX_Service {
    private logger = new Logger(Calc_SHAPEINDEX_Service.name);

    constructor(private readonly shapeindexRepository: ShapeIndexRepository, private readonly materialRepository: MaterialsRepository) { }

    async calculateShapeIndex({ step2Data }: Calc_SHAPEINDEX_Dto): Promise<{ success: boolean; result: Calc_SHAPEINDEX_Out }> {
        try {
            this.logger.log('calculate shapeindex on calc.shapeIndex.service.ts > [body]');

            const {  } = step2Data;

            return {
                success: true,
                result: {
                    shapeIndex: null,
                }
            };
        } catch (error) {
            return {
                success: false,
                result: null
            };
        }
    }
}