import { MaterialsRepository } from '../../../materials/repository';
import { AdhesivenessRepository } from "../repository";
import { AdhesivenessInitDto } from "../dto/adhesiveness-init.dto";
export declare class GeneralData_Adhesiveness_Service {
    private readonly adhesivenessRepository;
    private readonly materialsRepository;
    private logger;
    constructor(adhesivenessRepository: AdhesivenessRepository, materialsRepository: MaterialsRepository);
    verifyInitAdhesiveness({ name, material }: AdhesivenessInitDto): Promise<boolean>;
}
