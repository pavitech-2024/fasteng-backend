import { SuperpaveRepository } from '../repository';
import { SuperpaveDocument } from '../schemas';
import { Model } from 'mongoose';
export declare class FirstCompression_Superpave_Service {
    private superpaveModel;
    private readonly superpaveRepository;
    private logger;
    constructor(superpaveModel: Model<SuperpaveDocument>, superpaveRepository: SuperpaveRepository);
    calculateGmm_RiceTest(body: any): Promise<any>;
    saveFirstCompressionData(body: any, userId: string): Promise<boolean>;
}
