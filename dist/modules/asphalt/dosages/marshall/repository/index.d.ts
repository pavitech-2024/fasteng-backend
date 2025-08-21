import { FilterQuery, Model } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";
import { CreateMarshallDTO } from "../dto/create-marshal-dto";
export declare class MarshallRepository {
    private readonly marshallModel;
    constructor(marshallModel: Model<MarshallDocument>);
    create(marshall: CreateMarshallDTO): Promise<Marshall>;
    find(): Promise<Marshall[]>;
    findOne(name: string, userId: string): Promise<MarshallDocument | null>;
    findOneAndUpdate(marshallFilterQuery: FilterQuery<Marshall>, marshall: Partial<CreateMarshallDTO>): Promise<Marshall | null>;
    findById(dosageId: string): Promise<MarshallDocument | null>;
    createPartialMarshall(generalData: Partial<CreateMarshallDTO["generalData"]>, userId: string): Promise<Marshall>;
    saveStep(marshallId: string, step: number): Promise<void>;
}
