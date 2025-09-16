import { MaterialsRepository } from '../../../materials/repository';
import { AbrasionRepository } from "../repository";
import { AbrasionInitDto } from "../dto/abrasion-init.dto";
export declare class GeneralData_Abrasion_Service {
    private readonly abrasionRepository;
    private readonly materialRepository;
    private logger;
    constructor(abrasionRepository: AbrasionRepository, materialRepository: MaterialsRepository);
    verifyInitAbrasion({ name, material }: AbrasionInitDto): Promise<boolean>;
}
