import { Sample, SampleDocument } from '../schemas';
import { FilterQuery, Model } from 'mongoose';
export declare class SamplesRepository {
    private sampleModel;
    constructor(sampleModel: Model<SampleDocument>);
    create(sample: any): Promise<Sample>;
    find(): Promise<Sample[]>;
    findOne(samplesFilterQuery: FilterQuery<Sample>): Promise<Sample>;
    findOneAndUpdate(samplesFilterQuery: FilterQuery<Sample>, sample: Partial<Sample>): Promise<Sample>;
    findOneAndDelete(samplesFilterQuery: FilterQuery<Sample>): Promise<Sample>;
}
