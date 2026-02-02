import { IggRepository } from '../repository';
import { IggInitDto } from '../dto/init-igg.dto';
export declare class GeneralData_Igg_Service {
    private readonly iggRepository;
    private logger;
    constructor(iggRepository: IggRepository);
    verifyInitIgg({ name }: IggInitDto): Promise<boolean>;
}
