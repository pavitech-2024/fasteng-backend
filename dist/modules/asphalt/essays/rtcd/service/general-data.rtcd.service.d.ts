import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { RtcdInitDto } from '../dto/init-rtcd.dto';
import { RtcdRepository } from '../repository';
export declare class GeneralData_Rtcd_Service {
    private readonly rtcdRepository;
    private readonly materialsRepository;
    private logger;
    constructor(rtcdRepository: RtcdRepository, materialsRepository: MaterialsRepository);
    verifyInitRtcd({ name }: RtcdInitDto): Promise<boolean>;
}
