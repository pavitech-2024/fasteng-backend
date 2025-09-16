import { Calc_SPECIFYMASS_Dto, Calc_SPECIFYMASS_Out } from '../dto/calc.specifyMass.dto';
import { SpecifyMassRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
export declare class Calc_SPECIFYMASS_Service {
    private readonly specifyMassRepository;
    private readonly materialRepository;
    private logger;
    constructor(specifyMassRepository: SpecifyMassRepository, materialRepository: MaterialsRepository);
    calculateSpecifyMass({ step2Data }: Calc_SPECIFYMASS_Dto): Promise<{
        success: boolean;
        result: Calc_SPECIFYMASS_Out;
    }>;
    calculatingbulkSpecificGravity: (dry_mass: number, submerged_mass: number) => number;
    calculatingApparentSpecificGravity: (dry_mass: number, submerged_mass: number, saturated_mass: number) => number;
    calculatingAbsoption: (dry_mass: number, saturated_mass: number) => number;
}
