import { FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";
import { MarshallInitDto } from "../dto/marshall-init.dto";
export declare class MarshallRepository {
    private readonly marshallModel;
    constructor(marshallModel: Model<MarshallDocument>);
    create(marshall: Partial<Marshall>): Promise<MarshallDocument>;
    find(): Promise<Marshall[]>;
    findOne(name: string, userId: string): Promise<MarshallDocument | null>;
    findOneAndUpdate(marshallFilterQuery: FilterQuery<Marshall>, marshall: UpdateQuery<Marshall>): Promise<MarshallDocument | null>;
    findById(dosageId: string): Promise<MarshallDocument | null>;
    createPartialMarshall(marshall: MarshallInitDto, userId: string): Promise<MarshallDocument>;
    saveStep(marshall: Pick<MarshallDocument, "_id">, step: number): Promise<void>;
    findByIdAndUpdate(id: string, update: UpdateQuery<Marshall>, options?: QueryOptions<Marshall>): Promise<MarshallDocument | null>;
    findAllWithPagination(skip: number, limit: number): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Marshall> & Marshall & Required<{
        _id: string;
    }>> & Required<{
        _id: string;
    }>)[]>;
    countAll(): Promise<number>;
    findAll(): Promise<Marshall[]>;
}
