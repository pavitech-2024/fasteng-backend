import { Model } from 'mongoose';
import { Compression, CompressionDocument } from '../schema';
export declare class CompressionRepository {
    private compressionModel;
    constructor(compressionModel: Model<CompressionDocument>);
    findOne(compressionFilterQuery: any): Promise<Compression>;
    create(compression: any): Promise<Compression>;
}
