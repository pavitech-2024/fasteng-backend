import { MaterialsService } from '../service';
import { CreateAsphaltMaterialDto } from '../dto/create-asphalt-material.dto';
import { Material } from '../schemas';
export declare class MaterialsController {
    private readonly materialsService;
    private logger;
    constructor(materialsService: MaterialsService);
    createMaterial(material: CreateAsphaltMaterialDto, userId: string): Promise<Material>;
    getAllByUserIdList(userId: string): Promise<any[]>;
    getAllByUserId(userId: string): Promise<Material[]>;
    getMaterialById(materialId: string): Promise<any>;
    getSelectedMaterialsById(ids: string): Promise<any>;
    updateMaterialById(materialId: string, material: Material): Promise<Material>;
    deleteMaterialById(materialId: string): Promise<Material>;
}
