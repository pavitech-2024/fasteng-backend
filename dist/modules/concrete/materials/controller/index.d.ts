import { MaterialsService } from '../service';
import { CreateConcreteMaterialDto } from '../dto/create-concrete-material.dto';
import { Material } from '../schemas';
export declare class MaterialsController {
    private readonly materialsService;
    private logger;
    constructor(materialsService: MaterialsService);
    createMaterial(material: CreateConcreteMaterialDto): Promise<Material>;
    getAllByUserId(userId: string): Promise<{
        materials: Material[];
    }[]>;
    getMaterialById(materialId: string): Promise<any>;
    updateMaterialById(materialId: string, material: Material): Promise<Material>;
    deleteMaterialById(materialId: string): Promise<Material>;
}
