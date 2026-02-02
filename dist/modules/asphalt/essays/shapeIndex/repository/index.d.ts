import { ShapeIndex, ShapeIndexDocument } from '../schemas';
import { Model } from 'mongoose';
export declare class ShapeIndexRepository {
    private shapeIndexModel;
    private logger;
    constructor(shapeIndexModel: Model<ShapeIndexDocument>);
    findOne(shapeIndexFilterQuery: any): Promise<ShapeIndex>;
    findAll(): Promise<ShapeIndex[]>;
    create(shapeIndex: any): Promise<ShapeIndex>;
}
