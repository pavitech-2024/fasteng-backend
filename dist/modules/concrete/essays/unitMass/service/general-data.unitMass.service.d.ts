import { MaterialsRepository } from '../../../../../modules/concrete/materials/repository';
import { UnitMassRepository } from '../repository';
import { UnitMass_Init_Dto } from '../dto/unitMass-init.dto';
export declare class GeneralData_UnitMass_Service {
    private readonly UnitMassRepository;
    private readonly materialsRepository;
    private logger;
    constructor(UnitMassRepository: UnitMassRepository, materialsRepository: MaterialsRepository);
    verifyInitUnitMass({ experimentName, method, material }: UnitMass_Init_Dto): Promise<boolean>;
}
