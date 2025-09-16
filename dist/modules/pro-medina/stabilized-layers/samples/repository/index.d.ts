import { Model } from 'mongoose';
import { StabilizedLayers_Sample, StabilizedLayers_SamplesDocument } from '../schemas';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';
export declare class StabilizedLayers_SamplesRepository {
    private stabilizedLayers_sampleModel;
    constructor(stabilizedLayers_sampleModel: Model<StabilizedLayers_SamplesDocument>);
    create(stabilizedLayers_sample: any): Promise<StabilizedLayers_Sample>;
    find(): Promise<any>;
    findAll(options: {
        page: number;
        limit: number;
    }): Promise<any>;
    findAllByFilter(queryFilter: CommonQueryFilter): Promise<any>;
    findOne(stabilizedLayers_samplesFilterQuery: any): Promise<StabilizedLayers_Sample>;
    findOneById(sampleId: string): Promise<StabilizedLayers_Sample>;
    findOneAndUpdate(stabilizedLayers_samplesFilterQuery: any, stabilizedLayers_sample: Partial<StabilizedLayers_Sample>): Promise<StabilizedLayers_Sample>;
    findOneAndDelete(stabilizedLayers_samplesFilterQuery: any): Promise<StabilizedLayers_Sample>;
}
