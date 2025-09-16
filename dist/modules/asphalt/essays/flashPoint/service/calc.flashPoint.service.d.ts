import { Calc_FLASHPOINT_Dto, Calc_FLASHPOINT_Out } from '../dto/calc.flashPoint.dto';
import { FlashPointRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
export declare class Calc_FLASHPOINT_Service {
    private readonly flashPointRepository;
    private readonly materialRepository;
    private logger;
    constructor(flashPointRepository: FlashPointRepository, materialRepository: MaterialsRepository);
    calculateFlashPoint({ step2Data }: Calc_FLASHPOINT_Dto): Promise<{
        success: boolean;
        result: Calc_FLASHPOINT_Out;
    }>;
}
