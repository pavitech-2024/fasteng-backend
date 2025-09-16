import { ConcreteRcInitDto } from "../dto/concretert-init.dto";
import { ConcreteRCRepository } from "../respository";
export declare class GeneralData_CONCRETERC_Service {
    private readonly rcRepository;
    private logger;
    constructor(rcRepository: ConcreteRCRepository);
    verifyInitRc({ name }: ConcreteRcInitDto): Promise<boolean>;
}
