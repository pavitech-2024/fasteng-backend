import { FlashPointRepository } from '../repository';
import { FlashPointInitDto } from '../dto/flashPoint-init.dto';
import { MaterialsRepository } from '../../../materials/repository';
export declare class GeneralData_FLASHPOINT_Service {
    private readonly flashPointRepository;
    private readonly materialRepository;
    private logger;
    constructor(flashPointRepository: FlashPointRepository, materialRepository: MaterialsRepository);
    verifyInitFlashPoint({ name, material }: FlashPointInitDto): Promise<boolean>;
}
