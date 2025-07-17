import { MaterialsRepository } from '../../../materials/repository';
import { Calc_Penetration_Dto, Calc_Penetration_Out } from '../dto/calc.penetration.dto';
import { PenetrationRepository } from '../repository';
import { SofteningPointRepository } from '../../softeningPoint/repository';
export declare class Calc_Penetration_Service {
    private readonly penetrationRepository;
    private readonly materialRepository;
    private readonly softeningPointRespository;
    private logger;
    constructor(penetrationRepository: PenetrationRepository, materialRepository: MaterialsRepository, softeningPointRespository: SofteningPointRepository);
    calculatePenetration({ penetrationCalc, generalData, }: Calc_Penetration_Dto): Promise<{
        success: boolean;
        result: Calc_Penetration_Out;
    }>;
    private setIndexOfSusceptibility;
    private calculateIndexOfSusceptibility;
    private compareResults;
    private compareHighAndlower;
    private classifyCap;
    private ampAlert;
    private verifyResults;
}
