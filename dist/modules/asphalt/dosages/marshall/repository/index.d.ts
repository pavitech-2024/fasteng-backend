import { FilterQuery, Model } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";
import { MarshallInitDto } from "../dto/marshall-init.dto";
export declare class MarshallRepository {
    private marshallModel;
    constructor(marshallModel: Model<MarshallDocument>);
    create(marshall: any): Promise<Marshall>;
    find(): Promise<Marshall[]>;
    findOne(name: any, userId: string): Promise<Marshall>;
    findOneAndUpdate(marshallFilterQuery: FilterQuery<Marshall>, marshall: Partial<Marshall>): Promise<Marshall>;
    findById(dosageId: string): Promise<Marshall>;
    createPartialMarshall(marshall: MarshallInitDto, userId: string): Promise<any>;
    saveStep(marshall: any, step: number): Promise<void>;
}
