import { FilterQuery, Model } from "mongoose";
import { Superpave, SuperpaveDocument } from "../schemas";
export declare class SuperpaveRepository {
    private superpaveModel;
    constructor(superpaveModel: Model<SuperpaveDocument>);
    create(superpave: any): Promise<Superpave>;
    find(): Promise<Superpave[]>;
    findOne(name: any, userId: string): Promise<Superpave>;
    findOneAndUpdate(superpaveFilterQuery: FilterQuery<Superpave>, superpave: Partial<Superpave>): Promise<Superpave>;
    findById(dosageId: string): Promise<Superpave>;
    createPartialSuperpave(superpave: any, userId: string): Promise<any>;
    saveStep(superpave: any, step: number): Promise<void>;
}
