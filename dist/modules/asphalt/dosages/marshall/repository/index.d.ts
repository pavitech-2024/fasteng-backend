import { FilterQuery, Model } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";
import { MarshallInitDto } from "../dto/marshall-init.dto";
export declare class MarshallRepository {
    private marshallModel;
    constructor(marshallModel: Model<MarshallDocument>);
    create(marshall: any): Promise<Marshall>;
    find(): Promise<Marshall[]>;
    findOne(name: any, userId: string): Promise<MarshallDocument | null>;
    findOneAndUpdate(marshallFilterQuery: FilterQuery<Marshall>, marshall: Partial<Marshall>): Promise<Marshall>;
    findById(dosageId: string): Promise<Marshall>;
    createPartialMarshall(marshall: MarshallInitDto, userId: string): Promise<MarshallDocument>;
    saveStep(marshall: Pick<MarshallDocument, '_id'>, step: number): Promise<void>;
    findByIdAndUpdate(id: string, update: any, options?: any): Promise<Marshall>;
    findAllWithPagination(skip: number, limit: number): Promise<Marshall[]>;
    countAll(): Promise<number>;
    findAll(): Promise<Marshall[]>;
}
