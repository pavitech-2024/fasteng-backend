import { MaterialsRepository } from '../../../materials/repository';
import { PenetrationRepository } from "../repository";
import { PenetrationInitDto } from "../dto/penetration-init.dto";
export declare class GeneralData_Penetration_Service {
    private readonly penetrationRepository;
    private readonly materialRepository;
    private logger;
    constructor(penetrationRepository: PenetrationRepository, materialRepository: MaterialsRepository);
    verifyInitPenetration({ name, material }: PenetrationInitDto): Promise<boolean>;
}
