import { ShapeIndexRepository } from '../repository';
import { ShapeIndexInitDto } from '../dto/shapeIndex-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
export declare class GeneralData_SHAPEINDEX_Service {
    private readonly shapeIndexRepository;
    private readonly materialRepository;
    private logger;
    constructor(shapeIndexRepository: ShapeIndexRepository, materialRepository: MaterialsRepository);
    verifyInitShapeIndex({ name, material }: ShapeIndexInitDto): Promise<boolean>;
}
