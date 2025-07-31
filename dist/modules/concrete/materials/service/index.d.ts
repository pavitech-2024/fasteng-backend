import { MaterialsRepository } from '../repository';
import { CreateConcreteMaterialDto } from '../dto/create-concrete-material.dto';
import { Material } from '../schemas';
import { GetEssaysByMaterial_Service } from './get-essays-by-material.service';
export declare class MaterialsService {
    private readonly materialsRepository;
    private readonly getEssaysByMaterial_Service;
    private logger;
    constructor(materialsRepository: MaterialsRepository, getEssaysByMaterial_Service: GetEssaysByMaterial_Service);
    createMaterial(material: CreateConcreteMaterialDto, userId: string): Promise<Material>;
    getMaterial(materialId: string): Promise<any>;
    getAllMaterials(userId: string): Promise<Material[]>;
    updateMaterial(material: Material): Promise<Material>;
    deleteMaterial(materialId: string): Promise<Material>;
}
