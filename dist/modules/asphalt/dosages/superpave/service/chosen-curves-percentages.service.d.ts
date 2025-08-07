import { Model } from 'mongoose';
import { SuperpaveRepository } from '../repository';
import { SuperpaveDocument } from '../schemas';
export declare class ChosenCurvePercentages_Superpave_Service {
    private superpaveModel;
    private readonly superpave_repository;
    private logger;
    constructor(superpaveModel: Model<SuperpaveDocument>, superpave_repository: SuperpaveRepository);
    getChosenCurvePercentsData(body: any): Promise<{}>;
    savePercentsOfChosenCurveData(body: any, userId: string): Promise<boolean>;
}
