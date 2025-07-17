import { Model } from 'mongoose';
import { SuperpaveRepository } from '../repository';
import { SuperpaveDocument } from '../schemas';
export declare class SecondCompressionParameters_Superpave_Service {
    private superpaveModel;
    private readonly superpave_repository;
    private logger;
    constructor(superpaveModel: Model<SuperpaveDocument>, superpave_repository: SuperpaveRepository);
    getStep9Data(body: any): Promise<{
        optimumContent: any;
        graphs: {
            graphVv: any[][];
            graphVam: any[][];
            graphGmb: any[][];
            graphGmm: any[][];
            graphRBV: any[][];
            graphPA: any[][];
            graphRT: any[][];
        };
    }>;
    saveStep9Data(body: any, userId: string): Promise<boolean>;
}
