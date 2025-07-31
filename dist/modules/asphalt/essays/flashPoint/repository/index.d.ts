import { FlashPoint, FlashPointDocument } from '../schemas';
import { Model } from 'mongoose';
export declare class FlashPointRepository {
    private flashPointModel;
    private logger;
    constructor(flashPointModel: Model<FlashPointDocument>);
    findOne(flashPointFilterQuery: any): Promise<FlashPoint>;
    findAll(): Promise<FlashPoint[]>;
    create(flashPoint: any): Promise<FlashPoint>;
}
