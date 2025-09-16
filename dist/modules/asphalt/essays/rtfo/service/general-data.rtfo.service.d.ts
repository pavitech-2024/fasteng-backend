import { MaterialsRepository } from '../../../materials/repository';
import { RtfoInitDto } from "../dto/rtfo-init.dto";
import { RtfoRepository } from "../repository";
export declare class GeneralData_Rtfo_Service {
    private readonly rtfoRepository;
    private readonly materialsRepository;
    private logger;
    constructor(rtfoRepository: RtfoRepository, materialsRepository: MaterialsRepository);
    verifyInitRtfo({ name, material }: RtfoInitDto): Promise<boolean>;
}
