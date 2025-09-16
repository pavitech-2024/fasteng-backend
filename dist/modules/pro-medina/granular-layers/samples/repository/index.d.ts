import { Model } from 'mongoose';
import { GranularLayers_Sample, GranularLayers_SamplesDocument } from '../schemas';
import { CommonQueryFilter } from '../../../../../utils/queryFilter';
export declare class GranularLayers_SamplesRepository {
    private granularLayers_sampleModel;
    constructor(granularLayers_sampleModel: Model<GranularLayers_SamplesDocument>);
    create(granularLayers_sample: any): Promise<GranularLayers_Sample>;
    find(): Promise<GranularLayers_Sample[]>;
    findAllByFilter(queryFilter: CommonQueryFilter): Promise<any>;
    findOne(granularLayers_samplesFilterQuery: any): Promise<GranularLayers_Sample>;
    findOneById(sampleId: string): Promise<GranularLayers_Sample>;
    findOneAndUpdate(granularLayers_samplesFilterQuery: any, granularLayers_sample: Partial<GranularLayers_Sample>): Promise<GranularLayers_Sample>;
    findOneAndDelete(granularLayers_samplesFilterQuery: any): Promise<GranularLayers_Sample>;
}
