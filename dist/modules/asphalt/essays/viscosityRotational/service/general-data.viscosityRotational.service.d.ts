import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { ViscosityRotationalRepository } from '../repository';
import { ViscosityRotationalInitDto } from '../dto/init-viscosityRotational.dto';
export declare class GeneralData_ViscosityRotational_Service {
    private readonly viscosityRotationalRepository;
    private readonly materialsRepository;
    private logger;
    constructor(viscosityRotationalRepository: ViscosityRotationalRepository, materialsRepository: MaterialsRepository);
    verifyInitViscosityRotational({ name, material }: ViscosityRotationalInitDto): Promise<boolean>;
}
