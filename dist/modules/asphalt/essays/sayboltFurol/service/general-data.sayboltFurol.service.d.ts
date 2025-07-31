import { MaterialsRepository } from '../../../materials/repository';
import { SayboltFurolInitDto } from "../dto/init-sayboltFurol.dto";
import { SayboltFurolRepository } from "../repository";
export declare class GeneralData_SayboltFurol_Service {
    private readonly sayboltFurolRepository;
    private readonly materialsRepository;
    private logger;
    constructor(sayboltFurolRepository: SayboltFurolRepository, materialsRepository: MaterialsRepository);
    verifyInitSayboltFurol({ name, material }: SayboltFurolInitDto): Promise<boolean>;
}
