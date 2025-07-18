import { MaterialsRepository } from '../repository';
import { CreateAsphaltMaterialDto } from '../dto/create-asphalt-material.dto';
import { Material } from '../schemas';
import { GetEssaysByMaterial_Service } from './get-essays-by-material.service';
import { FwdRepository } from 'modules/asphalt/essays/fwd/repository';
import { IggRepository } from 'modules/asphalt/essays/igg/repository';
import { RtcdRepository } from 'modules/asphalt/essays/rtcd/repository';
import { DduiRepository } from 'modules/asphalt/essays/ddui/repository';
export declare class MaterialsService {
    private readonly materialsRepository;
    private readonly getEssaysByMaterial_Service;
    private readonly fwdRepository;
    private readonly iggRepository;
    private readonly rtcdRepository;
    private readonly dduiRepository;
    private logger;
    constructor(materialsRepository: MaterialsRepository, getEssaysByMaterial_Service: GetEssaysByMaterial_Service, fwdRepository: FwdRepository, iggRepository: IggRepository, rtcdRepository: RtcdRepository, dduiRepository: DduiRepository);
    createMaterial(material: CreateAsphaltMaterialDto, userId: string): Promise<Material>;
    getMaterial(materialId: string): Promise<any>;
    getSelectedMaterialsById(ids: string): Promise<any>;
    getAllMaterialsList(userId: string): Promise<any>;
    getAllMaterials(userId: string): Promise<Material[]>;
    updateMaterial(material: Material): Promise<Material>;
    deleteMaterial(materialId: string): Promise<Material>;
}
