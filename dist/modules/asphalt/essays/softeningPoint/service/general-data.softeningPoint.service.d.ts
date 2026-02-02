import { MaterialsRepository } from '../../../materials/repository';
import { SofteningPointInitDto } from "../dto/init-softeningPoint.dto";
import { SofteningPointRepository } from "../repository";
import { PenetrationRepository } from "../../penetration/repository/index";
export declare class GeneralData_SofteningPoint_Service {
    private readonly softeningPointRepository;
    private readonly materialsRepository;
    private readonly penetrationRepository;
    private logger;
    constructor(softeningPointRepository: SofteningPointRepository, materialsRepository: MaterialsRepository, penetrationRepository: PenetrationRepository);
    verifyInitSofteningPoint({ name, material }: SofteningPointInitDto): Promise<boolean>;
}
