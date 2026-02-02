import { ABCPRepository } from '../repository/index';
export declare class GeneralData_ABCP_Service {
    private readonly abcpRepository;
    private logger;
    constructor(abcpRepository: ABCPRepository);
    verifyInitABCP(abcp: any, userId: string): Promise<boolean>;
}
