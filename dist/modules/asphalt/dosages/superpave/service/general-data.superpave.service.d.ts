import { SuperpaveRepository } from '../repository/index';
import { Superpave, SuperpaveDocument } from '../schemas';
import { Model } from 'mongoose';
export declare class GeneralData_Superpave_Service {
    private superpaveModel;
    private readonly superpaveRepository;
    private logger;
    constructor(superpaveModel: Model<SuperpaveDocument>, superpaveRepository: SuperpaveRepository);
    verifyInitSuperpave(superpave: any, userId: string): Promise<{
        success: boolean;
        dosage: any;
    }>;
    getDosageById(dosageId: string): Promise<Superpave>;
    deleteSuperpaveDosage(dosageId: string): Promise<boolean>;
}
