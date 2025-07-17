import { ConcreteRtInitDto } from "../dto/concretert-init.dto";
import { ConcreteRtRepository } from "../repository";
export declare class GeneralData_CONCRETERT_Service {
    private readonly rtRepository;
    private logger;
    constructor(rtRepository: ConcreteRtRepository);
    verifyInitRt({ name }: ConcreteRtInitDto): Promise<boolean>;
}
