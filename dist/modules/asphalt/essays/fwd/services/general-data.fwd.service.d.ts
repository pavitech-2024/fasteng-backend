import { FwdRepository } from '../repository';
import { FwdInitDto } from '../dto/init-fwd.dto';
export declare class GeneralData_Fwd_Service {
    private readonly fwdRepository;
    private logger;
    constructor(fwdRepository: FwdRepository);
    verifyInitFwd({ name }: FwdInitDto): Promise<boolean>;
}
