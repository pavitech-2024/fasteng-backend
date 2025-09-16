import { Calc_DUCTILITY_Dto, Calc_DUCTILITY_Out } from '../dto/calc.ductility.dto';
import { DuctilityRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
export declare class Calc_DUCTILITY_Service {
    private readonly ductilityRepository;
    private readonly materialRepository;
    private logger;
    constructor(ductilityRepository: DuctilityRepository, materialRepository: MaterialsRepository);
    calculateDuctility({ step2Data }: Calc_DUCTILITY_Dto): Promise<{
        success: boolean;
        result: Calc_DUCTILITY_Out;
    }>;
}
